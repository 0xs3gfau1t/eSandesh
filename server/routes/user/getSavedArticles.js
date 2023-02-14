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
                    saved: { $slice: ['$saved', limit * page, limit] },
                    _id: false,
                },
            },
            { $unwind: { path: '$saved' } },
            {
                $lookup: {
                    from: 'articles',
                    let: { saved: '$saved' },
                    pipeline: [
                        { $match: { $expr: { $eq: ['$_id', '$$saved'] } } },
                        { $project: { title: 1, year: 1, month: 1, slug: 1 } },
                    ],
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
                $project: {
                    _id: '$articles._id',
                    year: '$articles.year',
                    month: '$articles.month',
                    slug: '$articles.slug',
                    title: '$articles.title',
                },
            },
        ])
    try {
        const articles = await Cache(req.originalUrl, getSaved, { 'EX': 60 })
        res.json({ message: 'success', articles: articles })
    } catch (err) {
        console.error(err)
        return res.status(500).json({ error: 'Something went wrong.' })
    }
}
