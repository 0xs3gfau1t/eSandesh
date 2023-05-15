const { redisClient } = require('@/config/redis')
const express = require('express')
const articleModel = require('@/model/article')
const generateSummary = require('@/controllers/summaryGenerationController')
const reciter = require('@/controllers/reciter')
const rawConverter = require('@/controllers/rawConverter')
const { JSDOM } = require('jsdom')

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
        img,
    } = req.body
    const { user } = req.session
    const filter = { _id: id }

    // If the user is not admin then
    // they can't delete others article
    if (user.provider != 'admin') filter.createdBy = user.id

    const contentOnly = new JSDOM(content).window.document.querySelector(
        'body'
    ).textContent

    const article = await articleModel.findOne({ _id: id })
    if (title) article.title = title
    if (content) article.content = content
    if (category) article.category = category
    if (tags) article.tags = tags
    article.summarizedContent = await generateSummary(contentOnly)
    article.audio = await rawConverter(
         await reciter({
             title,
             content: contentOnly,
         })
     )
    if (img) article.img = img

    var key
    try {
        await article.save()
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
