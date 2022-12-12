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
        popup = false,
        filterExpiry = 1,
    } = req.body

    filter = { popup: { $eq: popup } }

    if (Number(filterExpiry)) filter.expiry = { $gt: new Date() }

    if (category)
        filter[category] = {
            $all: category
                .split(',')
                .map(i => i.trim())
                .filter(i => i !== ''),
        }
    ads = adsModel
        .find(filter)
        .skip(page * limit)
        .limit(limit)
        .sort({ priority: priority })
        .exec((e, d) => {
            if (e)
                return res.status(500).json({ error: 'Something went wrong.' })
            res.json({ message: 'success', ad: d })
        })
}
