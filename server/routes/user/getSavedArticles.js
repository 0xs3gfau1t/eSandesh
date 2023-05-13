const Cache = require('@/controllers/Cache')
const express = require('express')
const mongoose = require('mongoose')
const { userModel } = require('../../model/user')

const ITEMS_PER_PAGE = 7

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @return {void}
 */
module.exports = async (req, res) => {
    let { page = 0 } = req.query
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
                    pipeline: [
                        {
                            $project: {
                                _id: true,
                                title: true,
                                createdBy: true,
                                category: true,
                                year: true,
                                month: true,
                                slug: true,
                                createdAt: true,
                                img: true,
                            },
                        },
                        { $skip: page * ITEMS_PER_PAGE },
                        { $limit: ITEMS_PER_PAGE },
                    ],
                    as: 'saved',
                },
            },
            {
                $unwind: {
                    path: '$saved',
                },
            },
            { $replaceRoot: { newRoot: '$saved' } },
            {
                $lookup: {
                    from: 'users',
                    localField: 'createdBy',
                    foreignField: '_id',
                    pipeline: [
                        { $project: { name: true, _id: true, image: true } },
                    ],
                    as: 'author',
                },
            },
            { $unwind: '$author' },
        ])
    try {
        const articles = await Cache(req.originalUrl, getSaved, { EX: 60 })
        const nextPage = articles.length < ITEMS_PER_PAGE ? undefined : page + 1
        res.json({ message: 'success', articles, nextPage })
    } catch (err) {
        console.error(err)
        return res.status(500).json({ error: 'Something went wrong.' })
    }
}
