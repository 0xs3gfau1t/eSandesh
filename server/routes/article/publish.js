const express = require('express')
const articleModel = require('../../model/article')
const sendNewsLetter = require('@/controllers/sendNewsLetter')

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
        if (req.body.noResponse !== true) res.json({ success: true })

        // Now notify subscribers
        const mailStatus = await sendNewsLetter(id)
        console.log({ mailStatus })
    } catch (err) {
        console.error(err)
        return res.status(500).json({ error: 'Something went wrong.' })
    }
}

module.exports = Publish
