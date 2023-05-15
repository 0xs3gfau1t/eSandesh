const express = require('express')
const pollsModel = require('../../model/polls')
const {redisClient} = require('@/config/redis')

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
const addPoll = async (req, res) => {
    const { question, options } = req.body
    if (!question || !options)
        return res.status(400).json({ error: 'Empty question or options.' })

    try {
        const poll = new pollsModel({
            question,
            options: options.map(option => ({ text: option })),
        })
        await poll.save()
        res.status(200).json({ success: true, poll })

        redisClient.del('/api/poll/list')
    } catch (err) {
        console.error(err)
        return res.status(500).json({ error: 'Something went wrong.' })
    }
}

module.exports = addPoll
