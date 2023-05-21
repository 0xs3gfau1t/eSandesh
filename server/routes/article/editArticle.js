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
    } = req.body
    const { user } = req.session
    const filter = { _id: id }

    // If the user is not admin then
    // they can't delete others article
    if (user.provider != 'admin') filter.createdBy = user.id

    const dom = new JSDOM(content)
    const contentOnly = dom.window.document.querySelector('body').textContent
    const img =
        req.body.img || dom.window.document.querySelector('img')?.src || ''

    const article = await articleModel.findOne({ _id: id })
    if (title) article.title = title
    if (content) article.content = content
    if (category) article.category = category
    if (tags) article.tags = tags
    if (img) article.img = img
    article.summarizedContent = await generateSummary(contentOnly)
    if (img) article.img = img

    var key
    try {
        await article.save()
        key = `/api/article/${article.year}/${article.month}/${article.slug}`
        res.status(200).json({ success: true })

        try {
            article.audio = await rawConverter(
                await reciter({
                    title,
                    content: contentOnly,
                })
            )
            await article.save()
            await redisClient.del(key)
        } catch (e) {
            console.error(e)
        }
    } catch (err) {
        console.error(err)
        return res.status(500).json({ error: 'Something went wrong.' })
    }
}

module.exports = editArticle
