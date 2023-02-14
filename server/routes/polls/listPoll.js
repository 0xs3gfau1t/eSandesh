const express = require('express')
const mongoose = require('mongoose')
const pollsModel = require('../../model/polls')
const Cache = require('@/controllers/Cache')

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
const listPoll = async (req, res) => {
    const { page = 0, items = 10 } = req.query

    const getPolls = async () =>
        await pollsModel.aggregate([
            { $sort: { createdAt: -1 } },
            { $skip: Number(page) * Number(items) },
            { $limit: Number(items) },
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
                                        mongoose.Types.ObjectId(
                                            req.session?.user?.id
                                        ),
                                        '$$options.users',
                                    ],
                                },
                            },
                        },
                    },
                },
            },
        ])
    try {
        const polls = await Cache(req.originalUrl, getPolls)
        return res.json(polls)
    } catch (err) {
        console.error(err)
        return res.status(500).json({ error: 'Something went wrong.' })
    }
}

module.exports = listPoll
