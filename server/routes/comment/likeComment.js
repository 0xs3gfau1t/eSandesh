const express = require('express')
const commentModel = require('../../model/comment')
const articleModel = require('../../model/article')
const { userModel } = require('../../model/user')
const updateHistory = require('../../controllers/updateHistory')
const { default: mongoose } = require('mongoose')
/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @return {void}
 */

module.exports = (req, res) => {
    const { id } = req.body

    commentModel.findOne({ _id: id }, async (e, d) => {
        if (!d) return res.status(404).json({ error: 'No such comment found' })

        const index = d.likes.indexOf(req.session.user.id)

        if (index > -1) d.likes.splice(index, 1)
        else d.likes.push(req.session.user.id)

        // Update user preference for this category
        const parentArticleCategories = await articleModel.findOne(
            {
                _id: d.article,
            },
            { category: true }
        )

        if (!parentArticleCategories)
            return res
                .status(500)
                .json({ error: 'Something went wrong on database' })

        parentArticleCategories.category.forEach(category => {
            if (!req.cookies.user.history.hasOwnProperty(category))
                req.cookies.user.history[category] = {
                    hits: 0,
                    likes: 0,
                    comments: 0,
                    watchtime: 0,
                }
            if (index == -1) req.cookies.user.history[category].likes += 1
            else req.cookies.user.history[category].likes -= 1
        })

        updateHistory({ req, res })
        res.json({
            message: 'success',
            newStatus: index == -1 ? 'Liked' : 'Not Liked',
        })

        await d.save()
    })
}
