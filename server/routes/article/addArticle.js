const express = require('express')
const articleModel = require('@/model/article')
const { JSDOM } = require('jsdom')
const reciter = require('@/controllers/reciter')
const generateSummary = require('@/controllers/summaryGenerationController')
const rawConverter = require('@/controllers/rawConverter')
const publish = require('@/routes/article/publish')

const socialApis = {
    facebook: require('./socials/facebook'),
}

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */

const addArticle = async (req, res) => {
    const {
        title,
        content,
        category = [],
        tags = [],
        priority,
        socials,
    } = req.body

    const { user } = req.session
    const dom = new JSDOM(content)
    const contentOnly = dom.window.document.querySelector('body').textContent
    const img =
        req.body.img || dom.window.document.querySelector('img')?.src || ''

    const data = {
        title,
        content,
        category,
        tags,
        createdBy: user.id,
        year: new Date().getFullYear(),
        month: new Date().getMonth(),
        slug:
            new Date().getTime() -
            new Date(
                new Date().getFullYear(),
                new Date().getMonth(),
                0
            ).getTime(),
        summarizedContent: await generateSummary(contentOnly),
        img,
    }

    // Donot publish article on save
    // POST to /publish to publish it
    // If you want to publish, create {publishedAt: new Date()}
    if (user?.roles?.isRoot || user?.roles?.canPublish) {
        data.priority = priority
    }

    try {
        const article = new articleModel(data)
        await article.save()

        res.status(200).json(data)

        try {
            article.audio = await rawConverter(
                await reciter({
                    title,
                    content: contentOnly,
                })
            )
            await article.save()
        } catch (e) {
            console.error(e)
        }

        const providedSocialsToUpdateOn =
            socials
                ?.split(',')
                .map(i => i.trim())
                .filter(i => i !== '') || []

        providedSocialsToUpdateOn.forEach(social => {
            if (socialApis[social])
                socialApis[social]({
                    title,
                    summary: data.summary,
                    link:
                        process.env.ORIGIN +
                        '/news/' +
                        data.year +
                        '/' +
                        data.month +
                        '/' +
                        data.slug,
                })
        })
        if (user.roles.isRoot || user.roles.canPublish) {
            req.body.id = article._id
            req.body.noResponse = true
            publish(req, res)
        }
    } catch (err) {
        console.error(err)
        return res.status(500).json({ error: 'Something went wrong.' })
    }
}

module.exports = addArticle
