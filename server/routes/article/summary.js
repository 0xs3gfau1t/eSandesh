const articleModel = require('@/model/article')
const express = require('express')

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @return {void}
 */
module.exports = async (req, res) => {
    const { _id } = req.query

    articleModel.findOne({ _id }, { summarizedContent: true }, (e, d) => {
        if (e) return res.status(500)
        if (!d)
            return res.status(404).json({ message: 'No such article found' })

        res.json({ message: 'success', summary: d.summarizedContent })
    })
}
