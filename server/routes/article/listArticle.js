const express = require('express')
const articleModel = require('../../model/article')
const { JSDOM } = require('jsdom')

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @return {express.Response}
 */
const listArticle = async (req, res) => {
    const {
        category = undefined,
        page = 0,
        items = 10,
        priority = false,
        from,
        to = new Date(),
    } = req.query
    const [year, month] = req.url.replace(/\?.*/, '').split('/').slice(2)

    const sortParameters = { publishedAt: -1 }
    if (priority) sortParameters.priority = -1
    else sortParameters.slug = -1

    let preference = false
    let hits = false
    // Only list published articles
    // Non published has to be requested through /toPublish endpoint
    const filter = {
        category: { $nin: ['STORY'] },
        publishedAt: { $exists: true },
    }
    if (category) {
        if (category == 'preference') preference = true
        else if (category == 'hot') hits = true
        else if (category == 'STORY') {
            filter.category['$in'] = [category]
            filter.category['$nin'] = []
        } else filter.category['$in'] = [category]
    }
    if (year) filter.year = year
    if (month) filter.month = month
    if (from) filter.createdAt = { $gte: new Date(from), $lt: new Date(to) }

    try {
        const articles = await articleModel.aggregate([
            { $match: filter },
            { $project: { audio: 0 } },
            { $sort: sortParameters },
            { $skip: page * items },
            { $limit: parseInt(items) },
        ])

        const user = req.cookies.user

        // sort the articles based on user's history
        articles.sort((a, b) => {
            if (preference) {
                var scoreA = a.category.reduce((accum, value) => {
                    return accum + user.history[value]?.hits || 0
                }, 0)

                var scoreB = b.category.reduce((accum, value) => {
                    return accum + user.history[value]?.hits || 0
                }, 0)

                const diff = scoreB - scoreA
                if (diff) return diff
            }

            // if priority is true then sort
            if (priority) {
                let d = b.priority - a.priority
                if (d) return d
            }

            if (hits) {
                let d = b.hits - a.hits
                if (d) return d
            }
            return 0
        })

        const new_articles = articles.map(article => {
            const dom = new JSDOM(article.content)
            const img = dom.window.document.querySelector('img')
            if (img) article.img = img.src
            delete article.content
            return article
        })

        return res.status(200).json(new_articles)
    } catch (err) {
        console.error(err)
        return res.status(500).json({ error: 'Something went wrong.' })
    }
}

module.exports = listArticle
