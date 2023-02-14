const Cache = require('@/controllers/Cache')
const express = require('express')
const commentModel = require('../../model/comment')

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
const topUser = async (req, res) => {
    const { limit = 5 } = req.query
    const today = new Date()
    const thisMonth = new Date(today.getFullYear(), today.getMonth(), 1)

    const getTop = async () =>
        await commentModel.aggregate([
            { $match: { createdAt: { $gt: thisMonth } } },
            { $project: { likes: { $size: '$likes' }, user: 1 } },
            {
                $group: {
                    _id: '$user',
                    commentCount: { $sum: 1 },
                    likeCount: { $sum: '$likes' },
                },
            },
            { $unwind: { path: '$_id' } },
            {
                $project: {
                    _id: 1,
                    score: {
                        $sum: [
                            { $multiply: ['$likeCount', 0.8] },
                            { $multiply: ['$commentCount', 0.2] },
                        ],
                    },
                },
            },
            { $sort: { score: -1 } },
            { $limit: Number(limit) },
            {
                $lookup: {
                    from: 'users',
                    let: { id: '$_id' },
                    pipeline: [
                        { $match: { $expr: { $eq: ['$_id', '$$id'] } } },
                        { $project: { name: 1, _id: 0 } },
                    ],
                    as: 'user',
                },
            },
            { $unwind: { path: '$user' } },
            { $project: { _id: 0, user: '$user.name', score: 1 } },
        ])
    try {
        const users = await Cache(req.originalUrl, getTop, {
            'EX': 24 * 60 * 60,
        })
        return res.json(users)
    } catch (err) {
        consol.error(err)
        return res.status(500).json({ error: 'Something went wrong.' })
    }
}

module.exports = topUser
