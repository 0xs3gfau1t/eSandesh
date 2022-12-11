const express = require('express')

const commentModel = require('../../model/comment')
const articleModel = require('../../model/article')

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @return {void}
 */
const addComment = async (req, res) => {
    const { articleId, content, commentId } = req.body
    const { user } = req.session
    // This creates a comment on article
    if (articleId) {
        try {
            const comment = new commentModel({
                user: user.id,
                content: content,
                article: articleId,
            })
            await comment.save()

            // Make sure it comment is updated on article
            await articleModel.findOneAndUpdate(
                { _id: articleId },
                { $push: { comments: comment._id } }
            )

            return res.json({ message: 'success', comment: comment })
        } catch (e) {
            console.log(e)
            return res.status(500).json({ error: 'Something went wrong' })
        }
    }

    // This creates comment on other comments
    if (commentId) {
        try {
            const comment = new commentModel({
                user: user.id,
                content: content,
                likes: 0,
            })
            await comment.save()
            await commentModel.findOneAndUpdate(
                { _id: commentId },
                { $push: { subComments: comment._id } }
            )
            return res.json({ message: 'success', comment: comment })
        } catch (e) {
            console.log(e)
            return res.status(500).json({ error: 'Something went wrong' })
        }
    }

    res.json({ message: 'Invalid parameters' })
}

module.exports = addComment
