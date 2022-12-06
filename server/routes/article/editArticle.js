const express = require('express')
const articleModel = require('../../model/article')

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @return {void}
 */
const editArticle = async (req, res) => {
    const { id, content, category = undefined, tags = undefined } = req.body

    try {
        const article = await articleModel.updateOne(
            { _id: id },
            { content, category, tags }
        )
        return res.status(200).json(article)
    } catch (err) {
        console.error(err)
        return res.status(500).json({ error: 'Something went wrong.' })
    }
}

module.exports = editArticle
