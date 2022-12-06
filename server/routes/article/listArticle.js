const express = require('express')
const articleModel = require('../../model/article')

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @return {void}
 */
const listArticle = async (req, res) => {
    const { category, page = 0 } = req.query

    try {
        const articles = await articleModel
            .find({ category })
            .skip(page * 10)
            .limit(10)

        return res.status(200).json(articles)
    } catch (err) {
        console.error(err)
        return res.status(500).json({ error: 'Something went wrong.' })
    }
}

module.exports = listArticle
