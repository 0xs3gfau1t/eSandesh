const express = require('express')
const mongoose = require('mongoose')
const { userModel } = require('@/model/user')
const Cache = require('@/controllers/Cache')

const ITEMS_PER_PAGE = 7

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
module.exports = async (req, res) => {
    const { id } = req.session.user

    var { page = 0 } = req.query
    page = Number(page)

    const getUserSubs = async () =>
        await userModel.aggregate([
            { $match: { _id: mongoose.Types.ObjectId(id) } },
            {
                $project: {
                    _id: false,
                    subscriptions: true,
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
            { $skip: page * ITEMS_PER_PAGE },
            { $limit: ITEMS_PER_PAGE },
            { $replaceRoot: { newRoot: '$subscriptions' } },
        ])
    try {
        const userSubs = await Cache(req.originalUrl, getUserSubs, {
            EX: 60,
        })
        console.log({ page, ITEMS_PER_PAGE, userSubs })
        const nextPage = userSubs.length < ITEMS_PER_PAGE ? undefined : page + 1
        return res.json({ subs: userSubs, nextPage })
    } catch (e) {
        console.error(e)
        res.status(500).json({ message: 'Something went wrong' })
    }
}
