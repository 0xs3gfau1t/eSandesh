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

    var article
    try {
        article = await articleModel.findOne({ year, month, slug })

        if (!article)
            return res.status(400).json({ message: 'Article not found.' })

        // if user is not logged in update their cookies
        if (!req.session) {
            var user = req.cookies?.user
            if (user) user = JSON.parse(user)
            else user = { history: {} }

            article.category.forEach(category => {
                let val = user.history[category] || 0
                user.history[category] = val + 1
            })

            res.cookie('user', JSON.stringify(user), {
                httpOnly: true,
                sameSite: 'lax',
            })
        }

        res.status(200).json(article)
    } catch (err) {
        console.error(err)
        return res.status(500).json({ error: 'Something went wrong.' })
    }

    // Update article count
    article.hits += 1
    await article.save()

    // If user is logged in update their history but don't update if the user is admin
    if (!req.session || req.session?.user?.roles?.isRoot) return
    user = await userModel.findOne({ _id: req.session.user.id })
    article.category.forEach(category => {
        let val = user?.history?.get(category) || 0
        user.history.set(category, val + 1)
    })
    await user.save()
}

module.exports = getArticle
