const express = require('express')
const { default: mongoose } = require('mongoose')
const pollsModel = require('../../model/polls')

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
const answerPoll = async (req, res) => {
    const { poll, option } = req.body

    if (!poll || !option)
        return res.status(400).json({ error: 'Missing poll id or option id.' })

    try {
        await pollsModel.updateOne(
            {
                _id: mongoose.Types.ObjectId(poll),
                'options._id': mongoose.Types.ObjectId(option),
            },
            { $addToSet: { 'options.$.users': req.session.user.id } }
        )

        const votes = await pollsModel.aggregate([
            { $match: { _id: mongoose.Types.ObjectId(poll) } },
            {
                $project: {
                    _id: false,
                    options: {
                        $map: {
                            input: '$options',
                            as: 'options',
                            in: {
                                _id: '$$options._id',
                                votes: { $size: '$$options.users' },
                            },
                        },
                    },
                },
            },
            { $unwind: { path: '$options' } },
            { $replaceRoot: { newRoot: '$options' } },
        ])

        res.json({ message: 'success', votes })
    } catch (err) {
        console.error(err)
        return res.status(500).json({ error: 'Something went wrong.' })
    }
}

module.exports = answerPoll
