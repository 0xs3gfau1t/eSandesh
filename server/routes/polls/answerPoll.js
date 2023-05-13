const { redisClient } = require('@/config/redis')
const express = require('express')
const { default: mongoose } = require('mongoose')
const pollsModel = require('../../model/polls')
const getPoll = require('./getPoll')

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
const answerPoll = async (req, res) => {
    if (!req.session)
        return res
            .status(403)
            .json({ message: 'Login to cast vote and see results' })

    const { poll, option } = req.body
    if (!poll || !option)
        return res.status(400).json({ error: 'Missing poll id or option id.' })

    try {
        const voted = await pollsModel.exists({
            _id: mongoose.Types.ObjectId(poll),
            options: {
                $elemMatch: {
                    users: mongoose.Types.ObjectId(req.session.user.id),
                },
            },
        })

        if (voted) return res.status(400).json({ error: 'Already voted.' })

        await pollsModel.updateOne(
            {
                _id: mongoose.Types.ObjectId(poll),
                'options._id': mongoose.Types.ObjectId(option),
            },
            { $addToSet: { 'options.$.users': req.session.user.id } }
        )

        //
        // Invalidate Cache everytime someone casts vote 
        //
        redisClient.del('api/poll?id='+poll)

        return getPoll(req, res)
    } catch (err) {
        console.error(err)
        return res.status(500).json({ error: 'Something went wrong.' })
    }
}

module.exports = answerPoll
