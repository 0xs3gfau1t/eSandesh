const express = require('express')

const adsModel = require('../../model/ads')

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @return {void}
 */

module.exports = (req, res) => {
    const { name, publisher, category, embedUrl, priority, price, size, id } =
        req.body
    const { user } = req.session

    if (!user?.roles?.isRoot)
        return res.json({ error: 'Not enough permission to edit ads' })

    const data = {}
    if (name) data.name = name
    if (embedUrl) data.embedUrl = embedUrl
    if (priority) data.priority = priority
    if (price) data.price = price
    if (size) data.size = size
    if (publisher) data.publisher = publisher
    if (category)
        data.category = category
            .split(',')
            .map(i => i.trim())
            .filter(i => i !== '')

    adsModel.findOneAndUpdate({ _id: id }, data, (e, d) => {
        if (d === null)
            return res.status(500).json({ error: 'No such ad exists.' })

        res.json({ message: 'success' })
    })
}
