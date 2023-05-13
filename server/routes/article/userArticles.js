const articleModel = require('@/model/article')
const express = require('express')
const mongoose = require('mongoose')

const ITEMS_PER_PAGE = 7

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @return {express.Response}
 */
const userArticles = async (req, res) => {
    const userId = req.query.userId || req.session?.user?.id
    if (!userId) return res.status(400).json({ error: 'Missing userId.' })

    let { page = 0 } = req.query
    page = Number(page)

    console.log(page, ITEMS_PER_PAGE)

    try {
        const articles = await articleModel.aggregate([
            { $match: { createdBy: mongoose.Types.ObjectId(userId) } },
            {
                $project: {
                    title: true,
                    category: true,
                    createdAt: true,
                    img: true,
                    hits: true,
                    year: true,
                    month: true,
                    slug: true,
                },
            },
            { $sort: { createdAt: -1 } },
            { $skip: page * ITEMS_PER_PAGE },
            { $limit: ITEMS_PER_PAGE },
        ])
        const nextPage = articles.length < ITEMS_PER_PAGE ? undefined : page + 1
        return res.json({ articles, nextPage })
    } catch (err) {
        console.error(err)
        return res.status(500).json({ error: 'Something went wrong.' })
    }
}

module.exports = userArticles
