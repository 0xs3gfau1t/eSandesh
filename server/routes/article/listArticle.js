const express = require('express')
const articleModel = require('../../model/article')
const { userModel } = require('../../model/user')
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
    } = req.query
    const [year, month] = req.url.replace(/\?.*/, '').split('/').slice(2)

    const sortParameters = { publishedAt: -1 }
    if (priority) sortParameters.priority = -1
    else sortParameters.slug = -1

    let preference = false
    let hits = false
    const filter = {}
    if (category) {
        if (category == 'preference') preference = true
        else if (category == 'hot') hits = true
        else filter.category = category
    }
    if (year) filter.year = year
    if (month) filter.month = month

    try {
        const articles = await articleModel.aggregate([
            { $match: filter },
            { $sort: sortParameters },
            { $skip: page * items },
            { $limit: parseInt(items) },
        ])

        var user = req.cookies?.user
        if (user) {
            // if previous cookie exists then parse it
            user = JSON.parse(user)
        } else {
            // if no previous cookie exists
            if (req.session) {
                // if the user is logged in fetch from db
                user = await userModel.findOne(
                    { _id: req.session.user.id },
                    { history: true, _id: false }
                )
                user = { history: Object.fromEntries(user.history) }
            } else {
                // if not logged in create empty history
                user = { history: {} }
            }

            // set the new cookie
            res.cookie('user', JSON.stringify(user), {
                httpOnly: true,
                sameSite: 'lax',
            })
        }

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
