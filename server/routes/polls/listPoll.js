const express = require('express')
const pollsModel = require('../../model/polls')

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
const listPoll = async (req, res) => {
    const { page = 0, items = 10 } = req.query
    try {
        const polls = await pollsModel
            .find()
            .sort({ createdAt: -1 })
            .skip(page * items)
            .limit(items)
        return res.json(polls)
    } catch (err) {
        console.error(err)
        return res.status(500).json({ error: 'Something went wrong.' })
    }
}

module.exports = listPoll
