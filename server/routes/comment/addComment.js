const express = require('express')

const commentModel = require('../../model/comment')

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @return {void}
 */
const addComment = async (req, res) => {
    const { articleId, content, parentComment } = req.body
    const { user } = req.session
    try {
        const comment = new commentModel({
            user: user.id,
            content: content,
            article: articleId,
            parentComment,
        })
        await comment.save()

        return res.json({ message: 'success', comment: comment })
    } catch (e) {
        console.log(e)
        return res.status(500).json({ error: 'Something went wrong' })
    }
}

module.exports = addComment
