const express = require('express')
const commentModel = require('../../model/comment')

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @return {void}
 */

module.exports = (req, res) => {
    const { commentId } = req.query

    commentModel.findOne({ _id: commentId }, (e, d) => {
        if (e) return res.status(500).json({ error: 'Something went wrong' })

        if (!d) return res.status(404).json({ error: 'No such comments' })

        res.json({ message: 'success', comments: d })
    })
}
