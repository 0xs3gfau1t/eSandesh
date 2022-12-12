const express = require('express')
const { default: mongoose } = require('mongoose')
const pollsModel = require('../../model/polls')

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
const answerPoll = async (req, res) => {
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

        const polls = await pollsModel.updateOne(
            {
                _id: mongoose.Types.ObjectId(poll),
                'options._id': mongoose.Types.ObjectId(option),
            },
            { $addToSet: { 'options.$.users': req.session.user.id } }
        )

        return res.status(200).json({ success: true })
    } catch (err) {
        console.error(err)
        return res.status(500).json({ error: 'Something went wrong.' })
    }
}

module.exports = answerPoll
