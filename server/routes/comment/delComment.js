const express = require('express')
const commentModel = require('../../model/comment')

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @return {void}
 */
const deleteChildren = arr => {
    console.log('Deleting children of ', arr)
    for (i of arr) {
        commentModel.findOne({ _id: i._id.toString() }, (e, d) => {
            if (e)
                return res.json({ error: 'Cannot find specified subcomment' })
            deleteChildren(d.subComments)
            commentModel.deleteOne({ _id: d._id }, (e, d) => {
                if (e) return res.json({ error: 'Cannot delete subcomment' })
            })
        })
    }
}
const delComment = (req, res) => {
    const { commentId } = req.body
    //const { userId } = req.auth
    userId = '6390122a8138df349bab6188'

    commentModel.findOneAndDelete(
        {
            _id: commentId,
            user: userId,
        },
        (e, d) => {
            if (e || !d) return res.json({ error: 'Comment Not Found' })

            deleteChildren(d.subComments)

            res.json({ message: 'success', comment: d })
        }
    )
}

module.exports = delComment
