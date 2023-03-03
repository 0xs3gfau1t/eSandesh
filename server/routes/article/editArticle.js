const { redisClient } = require('@/config/redis')
const express = require('express')
const articleModel = require('../../model/article')

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @return {void}
 */
const editArticle = async (req, res) => {
    const {
        id,
        content,
        title,
        category = undefined,
        tags = undefined,
    } = req.body
    const { user } = req.session
    const filter = { _id: id }

    // If the user is not admin then
    // they can't delete others article
    if (user.provider != 'admin') filter.createdBy = user.id

    const data = { content }
    if (title) data.title = title
    if (category) data.category = category
    if (tags) data.tags = tags
    var key
    try {
        const article = await articleModel.findOneAndUpdate(filter, data)
        key = `/api/article/${article.year}/${article.month}/${article.slug}`
        res.status(200).json({ success: true })
    } catch (err) {
        console.error(err)
        return res.status(500).json({ error: 'Something went wrong.' })
    }

    // Invalidate cache
    redisClient.del(key)
}

module.exports = editArticle
