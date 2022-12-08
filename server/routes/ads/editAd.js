const express = require('express')

const adsModel = require('../../model/ads')

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @return {void}
 */

module.exports = (req, res) => {
    const { name, publisher, embedUrl, priority, price, size, id } = req.body
    const { user } = req.session

    if (!user?.roles?.isRoot)
        return res.json({ error: 'Not enough permission to edit ads' })

    const data = {}
    if (name) data.name = name
    if (embedUrl) data.embedUrl = embedUrl
    if (priority) data.priority = priority
    if (price) data.price = price
    if (size) data.size = size

    // Currently only the creator of ads can edit ads and noone else
    // Not even root
    adsModel.findOneAndUpdate({ publisher: user.id, _id: id }, data, (e, d) => {
        if (e) return res.status(500).json({ error: 'Something went wrong.' })

        res.json({ message: 'success' })
    })
}
