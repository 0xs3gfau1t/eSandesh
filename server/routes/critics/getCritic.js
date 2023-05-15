const express = require('express')
const criticModel = require('../../model/critics')
const { ObjectId } = require('mongodb')

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @return {void}
 */

//
// This route is not used
//

module.exports = async (req, res) => {
    const { criticId } = req.query

    let d = await criticModel.aggregate([
        {
            $match: {
                _id: ObjectId(criticId),
            },
        },
        {
            $lookup: {
                from: 'comments',
                localField: 'commentId',
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
            $lookup: {
                from: 'article',
                localField: 'commentInfo.article',
                foreignField: '_id',
                as: 'articleInfo',
                pipeline: [
                    {
                        $project: {
                            title: true,
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
    ])
    d = await criticModel.aggregate([{ $match: { _id: ObjectId(criticId) } }])

    res.json({ message: 'success', critic: d })
}
