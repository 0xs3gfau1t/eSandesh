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
    const d = await criticModel.aggregate([
        {
            $match: {
                publishedAt: {
                    $exists: false,
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
            $sort: {
                'commentInfo.likeCount': -1,
            },
        },
    ])

    res.json({
        message: 'success',
        doc: d,
    })
}
