const express = require('express')
const pollsModel = require('../../model/polls')
const Cache = require('@/controllers/Cache')

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */

module.exports = async (req, res) => {
    const { limit = 10, page = 0 } = req.query

    try {
        const getPolls = async () =>
            await pollsModel

                .find({}, { question: true })
                .sort({ createdAt: -1 })
                .skip(Number(page) * Number(limit))
                .limit(Number(limit))

        const polls = await Cache(req.originalUrl, getPolls, { EX: 15 * 60 })

        res.json({ message: 'success', polls })
    } catch (e) {
        console.error(e)
        res.status(500)
    }
}
