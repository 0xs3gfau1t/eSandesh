const express = require('express')
const mongoose = require('mongoose')
const { userModel } = require('@/model/user')
const Cache = require('@/controllers/Cache')

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */

module.exports = async (req, res) => {
    const { id } = req.session.user

    var { limit = 10, page = 0 } = req.query
    limit = Number(limit)
    page = Number(page)

    const getUserSubs = async () =>
        await userModel.aggregate([
            { $match: { _id: mongoose.Types.ObjectId(id) } },
            {
                $project: {
                    _id: false,
                    subscriptions: {
                        $slice: ['$subscriptions', limit * page, limit],
                    },
                },
            },
            { $unwind: '$subscriptions' },
            {
                $lookup: {
                    from: 'users',
                    let: { id: '$subscriptions' },
                    pipeline: [
                        { $match: { $expr: { $eq: ['$_id', '$$id'] } } },
                        { $project: { name: true, image: true } },
                    ],
                    as: 'subscriptions',
                },
            },
            { $unwind: '$subscriptions' },
            { $replaceRoot: { newRoot: '$subscriptions' } },
        ])
    try {
        const userSubs = await Cache(req.originalUrl, getUserSubs, {
            EX: 60,
        })
        return res.json(userSubs)
    } catch (e) {
        console.error(e)
        res.status(500).json({ message: 'Something went wrong' })
    }
}
