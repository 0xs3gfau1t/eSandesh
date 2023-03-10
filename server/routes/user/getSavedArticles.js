const Cache = require('@/controllers/Cache')
const express = require('express')
const mongoose = require('mongoose')
const { userModel } = require('../../model/user')

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @return {void}
 */
module.exports = async (req, res) => {
    var { page = 0, limit = 10 } = req.query
    limit = Number(limit)
    page = Number(page)

    const { user } = req.session

    const getSaved = async () =>
        await userModel.aggregate([
            {
                $match: {
                    _id: mongoose.Types.ObjectId(user.id),
                },
            },
            {
                $project: {
                    saved: true,
                    _id: false,
                },
            },
            {
                $lookup: {
                    from: 'articles',
                    localField: 'saved',
                    foreignField: '_id',
                    as: 'articles',
                },
            },
            {
                $project: {
                    saved: false,
                },
            },
            {
                $unwind: {
                    path: '$articles',
                },
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'articles.createdBy',
                    foreignField: '_id',
                    as: 'author',
                },
            },
            {
                $addFields: {
                    author: {
                        $arrayElemAt: ['$author', 0],
                    },
                    articles: {
                        $mergeObjects: [
                            '$articles',
                            {
                                author: {
                                    $arrayElemAt: ['$author.name', 0],
                                },
                            },
                        ],
                    },
                },
            },
            {
                $project: {
                    'articles._id': true,
                    'articles.year': true,
                    'articles.month': true,
                    'articles.slug': true,
                    'articles.title': true,
                    'articles.author': true,
                },
            },
        ])
    try {
        const articles = await Cache(req.originalUrl, getSaved, { EX: 60 })
        res.json({ message: 'success', articles: articles })
    } catch (err) {
        console.error(err)
        return res.status(500).json({ error: 'Something went wrong.' })
    }
}
