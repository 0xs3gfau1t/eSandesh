const express = require('express')
const { default: mongoose } = require('mongoose')
const commentModel = require('../../model/comment')

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @return {void}
 */
const delComment = async (req, res) => {
    const { id } = req.body
    const { user } = req.session

    const rootComment = await commentModel.findOne(
        {
            _id: mongoose.Types.ObjectId(id),
            user: mongoose.Types.ObjectId(user.id),
        },
        { subComments: true }
    )
    if (!rootComment) return res.json({ error: 'Comment not found' })

    let toDelete = [id, ...rootComment.subComments]
    let ids = [...rootComment.subComments]

    while (ids.length > 0) {
        const currentId = ids.pop()
        const currentComment = await commentModel.findOne(
            { _id: mongoose.Types.ObjectId(currentId) },
            { subComments: true }
        )
        ids.concat(currentComment.subComments)
        toDelete.concat(currentComment.subComments)
    }

    await commentModel.deleteMany({ _id: { $in: toDelete } })
    return res.json({ message: 'success' })
}

module.exports = delComment
