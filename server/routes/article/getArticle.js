const express = require('express')
const articleModel = require('../../model/article')

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @return {void}
 */
const getArticle = async (req, res) => {
    const { year, month, slug } = req.params

    try {
        const article = await articleModel.findOne({ year, month, slug })
        return res.status(200).json(article)
    } catch (err) {
        console.error(err)
        return res.status(500).json({ error: 'Something went wrong.' })
    }
}

module.exports = getArticle
