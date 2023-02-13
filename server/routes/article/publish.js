const express = require('express')
const articleModel = require('../../model/article')

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @returns {express.Response}
 */
const Publish = async (req, res) => {
    const { id } = req.body
    try {
        const now = new Date()
        await articleModel.updateOne({ _id: id }, { publishedAt: now })
        return res.json({ success: true })
    } catch (err) {
        console.error(err)
        return res.status(500).json({ error: 'Something went wrong.' })
    }
}

module.exports = Publish
