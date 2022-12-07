const express = require('express')
const articleModel = require('../../model/article')

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
const addArticle = async (req, res) => {
    const { title, content, category = [], tags = [], priority } = req.body

    const { user } = req.session
    const data = { title, content, category, tags }

    // If the user is an admin then publish the article
    // also set the priority
    if (user.provider == 'admin') {
        data.publishedAt = new Date()
        data.priority = priority ?? 5
    } else {
        data.createdBy = user.id
    }

    try {
        const article = new articleModel(data)
        await article.save()

        return res.status(200).json(article)
    } catch (err) {
        console.error(err)
        return res.status(500).json({ error: 'Something went wrong.' })
    }
}

module.exports = addArticle
