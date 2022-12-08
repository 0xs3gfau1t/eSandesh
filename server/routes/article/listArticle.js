const express = require('express')
const articleModel = require('../../model/article')
const { userModel } = require('../../model/user')

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

    const sortParameters = {}
    if (priority) sortParameters.priority = -1
    else sortParameters.slug = -1

    const filter = {}
    if (category) filter.category = category
    if (year) filter.year = year
    if (month) filter.month = month

    try {
        const articles = await articleModel.aggregate([
            { $match: filter },
            { $skip: page * items },
            { $limit: items },
            { $sort: sortParameters },
        ])

        // If user is logged in sort the list based on their history
        // Maybe i could've used aggregations but this seemed way easier
        var user, isLoggedIn
        if (req.session?.user && !req.session.user?.roles?.isRoot) {
            user = await userModel.findOne(
                { _id: req.session.user.id },
                { history: true }
            )
            isLoggedIn = true
        } else {
            user = req.cookies?.user
            if (user) user = JSON.parse(user)
            else user = { history: {} }
            isLoggedIn = false
        }
        articles.sort((a, b) => {
            var scoreA = a.category.reduce((accum, value) => {
                return accum + isLoggedIn
                    ? user.history?.get(value) || 0
                    : user.history[value] || 0
            }, 0)

            var scoreB = b.category.reduce((accum, value) => {
                return accum + isLoggedIn
                    ? user.history?.get(value) || 0
                    : user.history[value] || 0
            }, 0)

            const diff = scoreB - scoreA
            if (diff) return diff

            // If both scored same points then sort based on hits
            return b.hits - a.hits
        })

        return res.status(200).json(articles)
    } catch (err) {
        console.error(err)
        return res.status(500).json({ error: 'Something went wrong.' })
    }
}

module.exports = listArticle
