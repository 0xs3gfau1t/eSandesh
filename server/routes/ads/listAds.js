const express = require('express')

const adsModel = require('../../model/ads')

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @return {void}
 */

module.exports = (req, res) => {
    const { category = [], priority = 1, page = 0, limit = 10 } = req.body
    ads = adsModel
        .find({ category })
        .skip(page * limit)
        .limit(limit)
        .sort({ priority: priority })
        .exec((e, d) => {
            if (e)
                return res.status(500).json({ error: 'Something went wrong.' })
            res.json({ message: 'success', ad: d })
        })
}
