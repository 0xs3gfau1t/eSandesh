const adsModel = require('@/model/ads')
const articleModel = require('@/model/article')
const commentModel = require('@/model/comment')
const pollsModel = require('@/model/polls')
const {
    metaModel,
    adsStatModel,
    articleStatModel,
    commentStatModel,
    pollStatModel,
    userStatModel,
} = require('@/model/stats')
const { userModel } = require('@/model/user')
const express = require('express')

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
const generateStats = async (req, res) => {
    const meta = new metaModel({})
    const userStats = await userModel.aggregate([
        {
            $project: {
                id: '$_id',
                _id: false,
                metaId: meta._id,
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
        { $merge: { into: { db: 'reporting', coll: 'users' } } },
    ])

    const adsStats = await adsModel.aggregate([
        {
            $project: {
                id: '$_id',
                _id: false,
                metaId: meta._id,
                hits: true,
            },
        },
        { $merge: { into: { db: 'reporting', coll: 'ads' } } },
    ])

    const articleStats = await articleModel.aggregate([
        {
            $project: {
                id: '$_id',
                _id: false,
                metaId: meta._id,
                hits: true,
            },
        },
        {
            $lookup: {
                from: 'users',
                localField: 'id',
                foreignField: 'saved',
                pipeline: [{ $project: { _id: true } }],
                as: 'saves',
            },
        },
        { $set: { saves: { $size: '$saves' } } },
        { $merge: { into: { db: 'reporting', coll: 'articles' } } },
    ])

    const commentStats = await commentModel.aggregate([
        {
            $project: {
                id: '$_id',
                _id: false,
                metaId: meta._id,
                likes: { $size: '$likes' },
            },
        },
        { $merge: { into: { db: 'reporting', coll: 'comments' } } },
    ])

    const pollStats = await pollsModel.aggregate([
        {
            $project: {
                id: '$id',
                _id: false,
                metaId: meta._id,
                votes: {
                    $reduce: {
                        input: '$options',
                        initialValue: 0,
                        in: { $add: ['$$value', { $size: '$$this.users' }] },
                    },
                },
            },
        },
        { $merge: { into: { db: 'reporting', coll: 'polls' } } },
    ])

    const userMetaData = await userModel.aggregate([
        {
            $project: {
                root: { $cond: ['$roles.isRoot', 1, 0] },
                publisher: { $cond: ['$roles.canPublish', 1, 0] },
                reporter: { $cond: ['$roles.isReporter', 1, 0] },
            },
        },
        {
            $group: {
                _id: null,
                count: { $sum: 1 },
                rootUsers: { $sum: '$root' },
                publisher: { $sum: '$publisher' },
                reporter: { $sum: '$reporter' },
            },
        },
        { $project: { _id: false } },
    ])

    const adsMetaData = await adsStatModel.aggregate([
        { $match: { metaId: meta._id } },
        {
            $group: {
                _id: null,
                count: { $sum: 1 },
                hits: { $sum: '$hits' },
            },
        },
        { $project: { _id: false } },
    ])
    const articleMetaData = await articleStatModel.aggregate([
        { $match: { metaId: meta._id } },
        {
            $group: {
                _id: null,
                count: { $sum: 1 },
                hits: { $sum: '$hits' },
            },
        },
        { $project: { _id: false } },
    ])
    const commentsMetaData = await commentStatModel.aggregate([
        { $match: { metaId: meta._id } },
        {
            $group: {
                _id: null,
                count: { $sum: 1 },
                likes: { $sum: '$likes' },
            },
        },
        { $project: { _id: false } },
    ])
    const pollsMetaData = await pollStatModel.aggregate([
        { $match: { metaId: meta._id } },
        {
            $group: {
                _id: null,
                count: { $sum: 1 },
                votes: { $sum: '$votes' },
            },
        },
        { $project: { _id: false } },
    ])

    meta.users = userMetaData[0]
    meta.ads = adsMetaData[0]
    meta.articles = articleMetaData[0]
    meta.comments = commentsMetaData[0]
    meta.polls = pollsMetaData[0]

    await meta.save()

    return res.send('OK')
}

module.exports = generateStats
