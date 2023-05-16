const articleModel = require('@/model/article')
const { userModel } = require('@/model/user')
const express = require('express')

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
const generateStats = async (req, res) => {
    const userStats = await userModel.aggregate([
        {
            $project: {
                id: '$_id',
                _id: false,
                savedArticles: {
                    $cond: [
                        { $eq: [{ $type: '$saved' }, 'array'] },
                        { $size: '$saved' },
                        0,
                    ],
                },
                subscribing: {
                    $cond: [
                        { $eq: [{ $type: '$subscriptions' }, 'array'] },
                        { $size: '$subscriptions' },
                        0,
                    ],
                },
            },
        },
        // Subscriber
        {
            $lookup: {
                from: 'users',
                localField: 'id',
                foreignField: 'subscriptions',
                pipeline: [{ $project: { _id: true } }],
                as: 'subscriber',
            },
        },
        { $set: { subscriber: { $size: '$subscriber' } } },
        // PublishedAds
        {
            $lookup: {
                from: 'ads',
                localField: 'id',
                foreignField: 'publisher',
                pipeline: [{ $project: { _id: true } }],
                as: 'publishedAds',
            },
        },
        { $set: { publishedAds: { $size: '$publishedAds' } } },
        // CreatedArticles
        {
            $lookup: {
                from: 'articles',
                localField: 'id',
                foreignField: 'createdBy',
                pipeline: [{ $project: { _id: true } }],
                as: 'createdArticles',
            },
        },
        { $set: { createdArticles: { $size: '$createdArticles' } } },
        // Comments
        {
            $lookup: {
                pipeline: [
                    {
                        $match: {
                            'options.users': '$$id',
                        },
                    },
                ],
                from: 'comments',
                localField: 'id',
                foreignField: 'user',
                pipeline: [
                    { $project: { _id: true, likes: { $size: '$likes' } } },
                ],
                as: 'comments',
            },
        },
        {
            $set: {
                comments: { $size: '$comments' },
                receivedLikes: {
                    $reduce: {
                        input: '$comments',
                        initialValue: 0,
                        in: { $add: ['$$value', '$$this.likes'] },
                    },
                },
            },
        },
        // LikedComments
        {
            $lookup: {
                from: 'comments',
                localField: 'id',
                foreignField: 'likes',
                pipeline: [{ $project: { _id: true } }],
                as: 'likedComments',
            },
        },
        { $set: { likedComments: { $size: '$likedComments' } } },
        // VotedPolls
        {
            $lookup: {
                from: 'polls',
                localField: 'id',
                foreignField: 'options.users',
                pipeline: [{ $project: { _id: true } }],
                as: 'votedPolls',
            },
        },
        { $set: { votedPolls: { $size: '$votedPolls' } } },
    ])

    res.json(userStats)
}

module.exports = generateStats
