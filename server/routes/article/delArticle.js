const express = require('express')
const articleModel = require('../../model/article')

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @return {void}
 */
const delArticle = async (req, res) => {
    const { id } = req.query

    try {
        const article = await articleModel.deleteOne({ _id: id })
        return res.status(200).json(article)
    } catch (err) {
        console.error(err)
        return res.status(500).json({ error: 'Something went wrong.' })
    }
}

module.exports = delArticle