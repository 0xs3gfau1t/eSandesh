const express = require('express')
const { userModel } = require('../../model/user')

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */

module.exports = (req, res) => {
    const { id } = req.session.user

    if (!id) return res.status(401).json({ error: 'Access Denied' })

    const { categories } = req.body

    userModel.findOne({ _id: id }, { subscriptions: true }, (e, user) => {
        if (e) return res.status(500).json({ error: 'Something went wrong' })

        if (!user)
            return res.status(404).json({ error: 'No such record found' })

        categories
            .split(',')
            .map(i => i.trim())
            .filter(i => i !== '')
            .forEach(category => {
                if (!user.subscriptions[category]) {
                    user.subscriptions.set(category, new Object())
                }
            })

        user.save()
        res.json({ message: 'success' })
    })
}
