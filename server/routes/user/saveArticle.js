const express = require('express')
const { userModel } = require('../../model/user')

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @return {void}
 */
module.exports = async (req, res) => {
    const { id } = req.body

    const { user } = req.session

    const u = await userModel.findOne({ _id: user.id }, { saved: true })

    if (!u) return res.status(404).json({ error: 'No such user found' })

    const saved = u.saved.indexOf(id)

    if (saved < 0) u.saved.push(id)

    u.save()

    res.json({ message: 'success' })
}
