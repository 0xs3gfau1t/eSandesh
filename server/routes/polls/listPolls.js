const express = require('express')
const pollsModel = require('../../model/polls')
const {
    Types: { ObjectId },
} = require('mongoose')

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
module.exports = async (req, res) => {
    let { limit = 10, page = 0, active = true } = req.query
    limit = Number(limit)
    page = Number(page)

    const userId = req.session?.user?.id
    const roles = req.session?.user?.roles

    const filter =
        active == 'true'
            ? { expiry: { $gt: new Date() } }
            : { expiry: { $lt: new Date() } }

    try {
        const polls = await pollsModel.aggregate([
            { $match: filter },
            { $sort: { createdAt: -1 } },
            { $skip: page * limit },
            { $limit: limit },
            {
                $project: {
                    question: true,
                    options: {
                        $map: {
                            input: '$options',
                            as: 'options',
                            in: {
                                _id: '$$options._id',
                                text: '$$options.text',
                                votes: { $size: '$$options.users' },
                                voted: {
                                    $in: [
                                        userId ? ObjectId(userId) : false,
                                        '$$options.users',
                                    ],
                                },
                            },
                        },
                    },
                    expiry: true,
                },
            },
        ])

        const now = new Date()
        // For each poll, voted property is added
        // polls.voted = -1 if not voted
        // other polls.voted = index of the option voted
        for (let i = 0; i < polls.length; i++) {
            polls[i].expired = polls[i].expiry < now
            let voted = -1

            for (let j = 0; j < polls[i].options.length; j++) {
                if (voted == -1) voted = polls[i].options[j].voted ? j : -1
                delete polls[i].options[j].voted
            }

            polls[i].voted = voted
            if (voted !== -1) continue

            // If the poll has not been voted
            // then remove the vote count
            // but only if user is not root
            if (roles?.isPublisher || roles?.isRoot || polls[i].expired)
                continue
            for (let j = 0; j < polls[i].options.length; j++)
                delete polls[i].options[j].votes
        }

        res.json(polls)
    } catch (e) {
        console.error(e)
        res.status(500)
    }
}
