const express = require('express')
const articleModel = require('../../model/article')

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
const addArticle = async (req, res) => {
    const { title, content, category = [], tags = [], priority } = req.body

    try {
        const article = new articleModel({
            title,
            content,
            category,
            tags,
            priority,
        })
        await article.save()

        return res.status(200).json(article)
    } catch (err) {
        console.error(err)
        return res.status(500).json({ error: 'Something went wrong.' })
    }
}

module.exports = addArticle
