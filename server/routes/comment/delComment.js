const express = require('express')
const commentModel = require('../../model/comment')

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @return {void}
 */
const delComment = (req, res) => {
    const { commentId } = req.query
    const { userId } = req.auth

    commentModel.findOneAndDelete(
        {
            _id: commentId,
            user: userId,
        },
        (e, d) => {
            if (e) return res.json({ error: 'Comment Not Found' })
            res.json({ message: 'success', comment: d })
        }
    )
}

module.exports = delComment
