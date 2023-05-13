const express = require('express')
const criticModel = require('../../model/critics')

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @return {void}
 */

//
// Top critics are those with high likes and subcomments
// TODO: Personalize top critics
//
module.exports = async (req, res) => {
    const { page = 0, limit = 10, timeRange = 1 } = req.query

    const d = await criticModel.aggregate([
        {
            $match: {
                publishedAt: {
                    $exists: true,
                    $gt: new Date(Date.now() - 60000 * 60 * 24 * timeRange),
                },
            },
        },
        {
            $lookup: {
                from: 'comments',
                localField: '_id',
                foreignField: '_id',
                as: 'commentInfo',
                pipeline: [
                    {
                        $project: {
                            content: true,
                            article: true,
                            likeCount: {
                                $size: '$likes',
                            },
                            user: true,
                            _id: true,
                        },
                    },
                ],
            },
        },
        {
            $lookup: {
                from: 'users',
                localField: 'commentInfo.user',
                foreignField: '_id',
                as: 'commentUserInfo',
                pipeline: [
                    {
                        $project: {
                            name: true,
                            _id: false,
                        },
                    },
                ],
            },
        },
        {
            $unwind: {
                path: '$commentInfo',
            },
        },
        {
            $unwind: {
                path: '$commentUserInfo',
            },
        },
        {
            $lookup: {
                from: 'articles',
                localField: 'commentInfo.article',
                foreignField: '_id',
                as: 'articleInfo',
                pipeline: [
                    {
                        $project: {
                            title: true,
                            year: true,
                            month: true,
                            slug: true,
                            _id: false,
                        },
                    },
                ],
            },
        },
        {
            $unwind: {
                path: '$articleInfo',
            },
        },
        {
            $project: {
                'commentInfo.user': false,
                'commentInfo.article': false,
                _id: false,
            },
        },
        {
            $sort: {
                'commentInfo.likeCount': -1,
            },
        },
    ])

    res.json({ message: 'success', critics: d })
}
