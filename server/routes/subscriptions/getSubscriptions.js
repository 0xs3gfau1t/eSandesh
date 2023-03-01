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
                        { $project: { name: true } },
                    ],
                    as: 'subscriptions',
                },
            },
            { $unwind: '$subscriptions' },
            {
                $group: {
                    _id: '$_id',
                    subs: {
                        $push: {
                            id: '$subscriptions._id',
                            name: '$subscriptions.name',
                        },
                    },
                },
            },
        ])
    try {
        const userSubs = await Cache(req.originalUrl, getUserSubs, {
            'EX': 60,
        })
        return res.json({ subs: userSubs.at(0)?.subs || [] })
    } catch (e) {
        console.error(e)
        res.status(500).json({ message: 'Something went wrong' })
    }
}
