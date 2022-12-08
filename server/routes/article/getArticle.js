const express = require('express')
const articleModel = require('../../model/article')
const { userModel } = require('../../model/user')

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

        // If user is logged in update their history
        if (!req.session) return
        const user = await userModel.findOne({ _id: req.session.user.id })
        article.category.forEach(category => {
            let val = user.history?.get(category) || 0
            user.history.set(category, val + 1)
        })
        await user.save()
    } catch (err) {
        console.error(err)
        return res.status(500).json({ error: 'Something went wrong.' })
    }
}

module.exports = getArticle
