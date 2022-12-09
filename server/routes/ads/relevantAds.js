const express = require('express')

const adsModel = require('../../model/ads')

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @return {void}
 */

// First filter non expired ads

module.exports = (req, res) => {
    const { page = 0, limit = 10 } = req.query

    ads = adsModel
        .find()
        .skip(page * limit)
        .limit(limit)
        .sort({})
        .exec((e, d) => {
            if (e)
                return res.status(500).json({ error: 'Something went wrong.' })
            res.json({ message: 'success', ad: d })
        })
}
