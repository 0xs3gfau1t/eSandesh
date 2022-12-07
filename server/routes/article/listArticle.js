const express = require('express')
const articleModel = require('../../model/article')

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @return {express.Response}
 */
const listArticle = async (req, res) => {
    const { category = undefined, page = 0, items = 10 } = req.query
    const [year, month] = req.url.replace(/\?.*/, '').split('/').slice(2)

    const filter = {}
    if (category) filter.category = category
    if (year) filter.year = year
    if (month) filter.month = month

    try {
        const articles = await articleModel
            .find(filter)
            .skip(page * items)
            .limit(items)

        return res.status(200).json(articles)
    } catch (err) {
        console.error(err)
        return res.status(500).json({ error: 'Something went wrong.' })
    }
}

module.exports = listArticle
