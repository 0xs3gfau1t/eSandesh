const express = require('express')
const pollsModel = require('../../model/polls')
const { redisClient } = require('@/config/redis')

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
const addPoll = async (req, res) => {
    const { question, options, expiry } = req.body
    if (!question || !options || !expiry)
        return res.status(400).json({ error: 'Missing field' })

    try {
        const poll = new pollsModel({
            question,
            options: options.map(option => ({ text: option })),
            expiry: new Date(Date.now() + Number(expiry) * 24 * 60 * 60 * 1000),
        })
        await poll.save()
        res.status(200).json({
            success: true,
            poll: {
                _id: poll._id,
                question: poll.question,
                options: poll.options.map(opt => ({
                    _id: opt._id,
                    text: opt.text,
                    votes: opt.users.length,
                })),
                voted: -1,
            },
        })
    } catch (err) {
        console.error(err)
        return res.status(500).json({ error: 'Something went wrong.' })
    }
}

module.exports = addPoll
