const express = require('express')

const adsModel = require('../../model/ads')

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @return {void}
 */

module.exports = (req, res) => {
    const { category, priority, page, limit } = req.body

    ads = adsModel
        .find({ category })
        .skip(page * limit || 0)
        .limit(limit || 10)
        .sort(priority ? -1 : 1)
        .exec((e, d) => {
            if (e)
                return res.status(500).json({ error: 'Something went wrong.' })
            res.json({ message: 'success', ad: d })
        })
}
