const express = require('express')

const adsModel = require('../../model/ads')

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @return {void}
 */

module.exports = (req, res) => {
    const {
        category,
        priority = 1,
        page = 0,
        limit = 10,
        popup,
        filterExpiry = false,
    } = req.body

    const filter = {}

    if (popup) filter.popup = { $eq: Boolean(popup) }
    if (filterExpiry) filter.expiry = { $gt: new Date() }

    if (category)
        filter[category] = {
            $all: category
                .split(',')
                .map(i => i.trim())
                .filter(i => i !== ''),
        }
    console.log(filter)
    adsModel
        .find(filter, {audio: 0})
        .skip(page * limit)
        .limit(limit)
        .sort({ priority })
        .exec((e, d) => {
            if (e)
                return res.status(500).json({ error: 'Something went wrong.' })
            res.json({ message: 'success', ad: d })
        })
}
