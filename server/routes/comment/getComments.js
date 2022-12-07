/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @return {void}
 */

const express = require('express')
const commentModel = require('../../model/comment')

const getComments = async (req, res) => {
    const { articleId, userId, page, items } = req.query

    if (articleId) {
        try {
            const comments = await commentModel
                .find({ article: articleId })
                .skip(page * 10 || 0)
                .limit(items || 10)

            res.json({ message: 'success', comments: comments })
        } catch (e) {
            console.log(e)
            res.json({ error: 'Something went wrong' })
        }
    }

    if (userId) {
        try {
            const comments = await commentModel
                .find({ user: userId })
                .skip(page * 10 || 0)
                .limit(items || 10)
            res.json({ message: 'success', comments: comments })
        } catch (e) {
            console.log(e)
            res.status(500).json({ error: 'Something went wrong' })
        }
    }
}

module.exports = getComments
