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
    const { articleId, userId, commentId, page, items } = req.query

    const currentUserId = req.session?.user?.id

    let matchObj
    if (articleId)
        matchObj = {
            article: mongoose.Types.ObjectId(articleId),
            parentComment: { $exists: false },
        }
    else if (userId) matchObj = { user: mongoose.Types.ObjectId(userId) }

    try {
        const comments = await Cache(
            req.originalUrl,
            async () =>
                await commentModel.aggregate([
                    { $match: matchObj },
                    { $skip: Number(page) * 10 || 0 },
                    { $limit: Number(items) || 10 },
                    {
                        $lookup: {
                            from: 'users',
                            let: {
                                id: '$user',
                            },
                            pipeline: [
                                {
                                    $match: {
                                        $expr: {
                                            $eq: ['$_id', '$$id'],
                                        },
                                    },
                                },
                                {
                                    $project: {
                                        name: 1,
                                        image: 1,
                                    },
                                },
                            ],
                            as: 'user',
                        },
                    },
                    {
                        $unwind: {
                            path: '$user',
                            preserveNullAndEmptyArrays: true,
                        },
                    },
                    {
                        $graphLookup: {
                            from: 'comments',
                            startWith: '$_id',
                            connectFromField: '_id',
                            connectToField: 'parentComment',
                            as: 'subComments',
                            maxDepth: 4,
                            depthField: 'level',
                        },
                    },
                    {
                        $unwind: {
                            path: '$subComments',
                            preserveNullAndEmptyArrays: true,
                        },
                    },
                    {
                        $sort: {
                            'subComments.level': -1,
                        },
                    },
                    {
                        $lookup: {
                            from: 'users',
                            let: {
                                id: '$subComments.user',
                            },
                            pipeline: [
                                {
                                    $match: {
                                        $expr: {
                                            $eq: ['$_id', '$$id'],
                                        },
                                    },
                                },
                                {
                                    $project: {
                                        name: 1,
                                        image: 1,
                                    },
                                },
                            ],
                            as: 'subComments.user',
                        },
                    },
                    {
                        $unwind: {
                            path: '$subComments.user',
                            preserveNullAndEmptyArrays: true,
                        },
                    },
                    {
                        $set: {
                            liked: {
                                $in: [
                                    currentUserId
                                        ? mongoose.Types.ObjectId(currentUserId)
                                        : 'false',
                                    '$likes',
                                ],
                            },
                            likes: { $size: '$likes' },
                            'subComments.liked': {
                                $cond: [
                                    {
                                        $ifNull: ['$subComments._id', false],
                                    },
                                    {
                                        $in: [
                                            currentUserId
                                                ? mongoose.Types.ObjectId(
                                                    currentUserId
                                                )
                                                : 'false',
                                            '$subComments.likes',
                                        ],
                                    },
                                    '$$REMOVE',
                                ],
                            },
                            'subComments.likes': {
                                $cond: [
                                    {
                                        $ifNull: ['$subComments._id', false],
                                    },
                                    {
                                        $size: '$subComments.likes',
                                    },
                                    '$$REMOVE',
                                ],
                            },
                        },
                    },
                    {
                        $set: {
                            subComments: {
                                $cond: [
                                    { $ifNull: ['$subComments._id', false] },
                                    '$subComments',
                                    '$$REMOVE',
                                ],
                            },
                        },
                    },
                    {
                        $group: {
                            _id: '$_id',
                            user: { $first: '$user' },
                            content: { $first: '$content' },
                            article: { $first: '$article' },
                            liked: { $first: '$liked' },
                            likes: { $first: '$likes' },
                            revisions: { $first: '$revisions' },
                            updatedAt: { $first: '$updatedAt' },
                            subComments: { $push: '$subComments' },
                        },
                    },
                    {
                        $set: {
                            subComments: {
                                $reduce: {
                                    input: '$subComments',
                                    initialValue: {
                                        currentLevel: -1,
                                        currentLevelCmnt: [],
                                        previousLevelCmnt: [],
                                    },
                                    in: {
                                        $let: {
                                            vars: {
                                                prev: {
                                                    $cond: [
                                                        {
                                                            $eq: [
                                                                '$$value.currentLevel',
                                                                '$$this.level',
                                                            ],
                                                        },
                                                        '$$value.previousLevelCmnt',
                                                        '$$value.currentLevelCmnt',
                                                    ],
                                                },
                                                current: {
                                                    $cond: [
                                                        {
                                                            $eq: [
                                                                '$$value.currentLevel',
                                                                '$$this.level',
                                                            ],
                                                        },
                                                        '$$value.currentLevelCmnt',
                                                        [],
                                                    ],
                                                },
                                            },
                                            in: {
                                                currentLevel: '$$this.level',
                                                previousLevelCmnt: '$$prev',
                                                currentLevelCmnt: {
                                                    $concatArrays: [
                                                        '$$current',
                                                        [
                                                            {
                                                                _id: '$$this._id',
                                                                user: '$$this.user',
                                                                content:
                                                                    '$$this.content',
                                                                article:
                                                                    '$$this.article',
                                                                liked: '$$this.liked',
                                                                likes: '$$this.likes',
                                                                revisions:
                                                                    '$$this.revisions',
                                                                updatedAt:
                                                                    '$$this.updatedAt',
                                                                parentComment:
                                                                    '$$this.parentComment',
                                                                subComments: {
                                                                    $filter: {
                                                                        input: '$$prev',
                                                                        as: 'e',
                                                                        cond: {
                                                                            $eq: [
                                                                                '$$e.parentComment',
                                                                                '$$this._id',
                                                                            ],
                                                                        },
                                                                    },
                                                                },
                                                            },
                                                        ],
                                                    ],
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                    {
                        $set: {
                            subComments: '$subComments.currentLevelCmnt',
                        },
                    },
                ]),
            { EX: 15 * 60 }
        )

        res.json({ message: 'success', comments })
    } catch (e) {
        console.log(e)
        res.json({ error: 'Something went wrong' })
    }
}

module.exports = getComments
