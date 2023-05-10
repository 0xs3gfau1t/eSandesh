const express = require('express')
const { default: mongoose } = require('mongoose')
const { userModel } = require('../../model/user')

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @return {void}
 */
module.exports = async (req, res) => {
    const { id } = req.body
    const { user } = req.session

    try {
        await userModel.updateOne(
            { _id: user?.id },
            { $pull: { saved: mongoose.Types.ObjectId(id) } }
        )
        return res.status(200).json({ message: 'success' })
    } catch (err) {
        console.error(err)
        return res.status(500).json({ error: 'Something went wrong.' })
    }
}
