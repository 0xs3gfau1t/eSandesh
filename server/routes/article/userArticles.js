const articleModel = require('@/model/article')
const express = require('express')

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @return {express.Response}
 */
const userArticles = async (req, res) => {
    const userId = req.query.userId || req.session?.user?.id
    if (!userId) return res.status(400).json({ error: 'Missing userId.' })

    try {
        const articles = await articleModel.find(
            { createdBy: userId },
            {
                title: true,
                category: true,
                tags: true,
                createdAt: true,
                year: true,
                month: true,
                slug: true,
                _id: false,
            }
        )
        return res.json(articles)
    } catch (err) {
        console.error(err)
        return res.status(500).json({ error: 'Something went wrong.' })
    }
}

module.exports = userArticles
