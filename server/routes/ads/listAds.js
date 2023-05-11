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
        audio,
    } = req.query
    let { imageType } = req.query

    const filter = {}

    if (popup) filter.popup = { $eq: Boolean(popup) }
    if (filterExpiry) filter.expiry = { $gt: new Date() }

    if (category)
        filter['category'] = {
            $all: category
                .split(',')
                .map(i => i.trim())
                .filter(i => i !== ''),
        }
    if (imageType) {
        if (['rectX', 'rectY', 'square'].includes(imageType))
            imageType = 'image.' + imageType
        else imageType = 'image'
        filter[imageType] = { $exists: true }
    }
    if (audio) filter.audio = { $exists: true }

    adsModel
        .find(filter, { audio: 0, image: 0 })
        .skip(page * limit)
        .limit(limit)
        .sort({ priority })
        .exec((e, d) => {
            if (e)
                return res.status(500).json({ error: 'Something went wrong.' })
            res.json({ message: 'success', ad: d })
        })
}
