const Cache = require('@/controllers/Cache')
const express = require('express')
const commentModel = require('../../model/comment')

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @return {void}
 */

const getComments = async (req, res) => {
    const { articleId, userId, page, items } = req.query

    if (articleId) {
        try {
            const comments = await Cache(
                req.originalUrl,
                async () =>
                    await commentModel
                        .find({ article: articleId })
                        .skip(page * 10 || 0)
                        .limit(items || 10),
                { 'EX': 15 * 60 }
            )

            res.json({ message: 'success', comments: comments })
        } catch (e) {
            console.log(e)
            res.json({ error: 'Something went wrong' })
        }
    }

    if (userId) {
        try {
            const comments = await Cache(
                req.originalUrl,
                async () =>
                    await commentModel
                        .find({ user: userId })
                        .skip(page * 10 || 0)
                        .limit(items || 10),
                { 'EX': 15 * 60 }
            )
            res.json({ message: 'success', comments: comments })
        } catch (e) {
            console.log(e)
            res.status(500).json({ error: 'Something went wrong' })
        }
    }
}

module.exports = getComments
