const express = require('express')
const criticModel = require('../../model/critics')

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @return {void}
 */

//
// Top critics are those with high likes and subcomments
//
module.exports = async (req, res) => {
    const { page = 0, limit = 10 } = req.query
    const critics = await criticModel.aggregate([
        {
            $match: {
                publishedAt: { $exists: false },
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
                            category: true,
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
        {
            $skip: Number(page) * Number(limit),
        },
        {
            $limit: Number(limit),
        },
    ])

    console.log(critics)
    res.json({
        message: 'success',
        critics,
    })
}
