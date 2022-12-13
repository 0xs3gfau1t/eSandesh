const express = require('express')
const { userModel } = require('../../model/user')
/**
 * @param {express.Request} req
 * @param {express.Response} res
 */

module.exports = async (req, res) => {
    const { id } = req.session.user

    if (!id) return res.status(404).json({ error: 'Access Denied' })

    const { limit = 10, page = 0 } = req.query

    try {
        const user = await userModel
            .findOne({ _id: id }, { subscriptions: true })
            .skip(page * limit)
            .limit(limit)
        if (!user)
            return res.status(404).json({ message: 'No such user found' })

        res.json({ message: 'success', doc: user })
    } catch (e) {
        console.error(e)
        res.status(500).json({ message: 'Something went wrong' })
    }
}
