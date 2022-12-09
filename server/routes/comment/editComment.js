const express = require('express')

const commentModel = require('../../model/comment')

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @return {void}
 */
const editComment = async (req, res) => {
    const { commentId, content } = req.body
    const { user } = req.auth
    // Find a way to find-and-update with previous content on hand during wuery exection
    try {
        const comment = await commentModel.findOne({
            _id: commentId,
            user: user.id,
        })

        if (comment === null)
            return res
                .status(404)
                .json({ error: 'Cannot find requested comment' })

        const updatedComment = await commentModel.updateOne(
            { _id: commentId },
            {
                content: content,
                $push: {
                    revisions: {
                        content: comment.content,
                        timestamp: comment.updatedAt,
                    },
                },
            }
        )
        return res.json({ message: 'success', comment: updatedComment })
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            error: 'Error while updating comment',
        })
    }
}

module.exports = editComment
