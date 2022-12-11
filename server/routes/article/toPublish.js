const express = require('express')
const articleModel = require('../../model/article')

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @returns {express.Response}
 */
const toPublish = async (req, res) => {
    const { page = 0, items = 0, sortBy = 'hits' } = req.query

    try {
        const articles = await articleModel
            .find({ publishedAt: { $exists: false } })
            .sort({ [sortBy]: -1 })
            .skip(page * items)
            .limit(items)
        return res.json(articles)
    } catch (err) {
        console.error(err)
        return res.status(500).json({ error: 'Something went wrong.' })
    }
}

module.exports = toPublish
