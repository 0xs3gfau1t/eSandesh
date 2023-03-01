const express = require('express')
const mongoose = require('mongoose')
const { userModel } = require('@/model/user')

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */

module.exports = async (req, res) => {
    const { id } = req.session.user
    const { id: subId } = req.body

    try {
        const exists = await userModel.exists({
            _id: mongoose.Types.ObjectId(subId),
        })
        if (!exists) return res.status(500).json({ error: 'Invalid user.' })

        await userModel.updateOne(
            { _id: id },
            { $addToSet: { subscriptions: mongoose.Types.ObjectId(subId) } }
        )
        return res.status(200).json({ success: true })
    } catch (err) {
        console.error(err)
        return res.status(500).json({ error: 'Something went wrong.' })
    }
}
