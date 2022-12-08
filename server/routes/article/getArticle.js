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

        if (!article)
            return res.status(400).json({ message: 'Article not found.' })

        res.status(200).json(article)

        // Update article count
        article.hits += 1
        await article.save()
    } catch (err) {
        console.error(err)
        return res.status(500).json({ error: 'Something went wrong.' })
    }
}

module.exports = getArticle
