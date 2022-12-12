const express = require('express')
const criticModel = require('../../model/critics')

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @return {void}
 */

module.exports = async (req, res) => {
    const {
        id,
        name,
        content,
        year,
        month,
        slug,
        likes = 0,
        commentId,
    } = req.body

    const articleIdentifier =
        year && month && slug ? { year, month, slug } : undefined

    criticModel.findOneAndUpdate(
        { _id: id },
        {
            name,
            content,
            article: articleIdentifier,
            likes,
            commentId,
        },
        (e, d) => {
            if (!d) {
                return res.status(404).json({
                    error: 'No such record exists',
                })
            }

            res.json({ message: 'success', doc: d })
        }
    )
}
