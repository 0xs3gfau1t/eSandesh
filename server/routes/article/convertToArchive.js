const express = require('express')
const articleModel = require('@/model/article')

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */

module.exports = async (req, res) => {
    const { _id } = req.body

    articleModel.updateOne(
        { _id },
        {
            $unset: {
                audio: true,
                summarizedContent: true,
                hits: true,
                tags: true,
                priority: true,
            },
            $set: {
                archived: true,
            },
        },
        (e, d) => {
            if (e) res.status(500)
            res.json({ message: 'success' })
        }
    )
}
