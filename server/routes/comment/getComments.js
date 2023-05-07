const Cache = require('@/controllers/Cache')
const express = require('express')
const { default: mongoose } = require('mongoose')
const commentModel = require('../../model/comment')

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @return {void}
 */

const getComments = async (req, res) => {
    const { articleId, userId, page, items } = req.query

    if (articleId) {
        try {
            const comments = await Cache(
                req.originalUrl,
                async () =>
                    await commentModel.aggregate([
                        {
                            $match: {
                                article: mongoose.Types.ObjectId(articleId),
                            },
                        },
                        { $skip: Number(page) * 10 || 0 },
                        { $limit: Number(items) || 10 },
                        {
                            $project: {
                                _id: false,
                                id: '$_id',
                                user: true,
                                content: true,
                                subComments: true,
                                liked: {
                                    $in: [
                                        req.session?.user?.id
                                            ? mongoose.Types.ObjectId(
                                                req.session?.user?.id
                                            )
                                            : 'false',
                                        '$likes',
                                    ],
                                },
                                likes: { $size: '$likes' },
                                createdAt: true,
                            },
                        },
                        {
                            $lookup: {
                                from: 'users',
                                let: { id: '$user' },
                                pipeline: [
                                    {
                                        $match: {
                                            $expr: { $eq: ['$_id', '$$id'] },
                                        },
                                    },
                                    {
                                        $project: {
                                            name: 1,
                                            image: 1,
                                            id: '$_id',
                                        },
                                    },
                                ],
                                as: 'user',
                            },
                        },
                        {
                            $unwind: {
                                path: '$user',
                            },
                        },
                    ]),
                { EX: 15 * 60 }
            )

            res.json({ message: 'success', comments: comments })
        } catch (e) {
            console.log(e)
            res.json({ error: 'Something went wrong' })
        }
    }

    if (userId) {
        try {
            const comments = await Cache(
                req.originalUrl,
                async () =>
                    await commentModel
                        .find({ user: userId })
                        .skip(page * 10 || 0)
                        .limit(items || 10),
                { EX: 15 * 60 }
            )
            res.json({ message: 'success', comments: comments })
        } catch (e) {
            console.log(e)
            res.status(500).json({ error: 'Something went wrong' })
        }
    }
}

module.exports = getComments
