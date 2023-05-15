const express = require('express')
const pollsModel = require('@/model/polls')
const Cache = require('@/controllers/Cache')
const { ObjectId } = require('mongodb')

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */

module.exports = async (req, res) => {
    if (!req.session)
        return res
            .status(403)
            .json({ message: 'Login to cast vote and see results' })

    const { id } = req.query
    async function getPoll() {
        const polls =
            (await pollsModel.aggregate([
                {
                    $match: { _id: ObjectId(id) },
                },
                {
                    $project: {
                        question: 1,
                        options: {
                            $map: {
                                input: '$options',
                                as: 'options',
                                in: {
                                    _id: '$$options._id',
                                    text: '$$options.text',
                                    users: { $size: '$$options.users' },
                                    voted: {
                                        $in: [
                                            ObjectId(req.session?.user?.id),
                                            '$$options.users',
                                        ],
                                    },
                                },
                            },
                        },
                    },
                },
            ])) || []

        //
        // Replace total count of votes to percentage
        //
        polls.forEach(p => {
            totalVotes = p.options.reduce((a,v)=>a+v.users, 0)
            p.options.forEach(o => (o.users = o.users / totalVotes))
        })

        return polls
    }
    try {
        const poll = await Cache(req.originalUrl, getPoll, { EX: 60 })
        res.json({ message: 'success', poll })
    } catch (e) {
        console.error(e)
        res.status(500)
    }
}
