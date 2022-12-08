const express = require('express')

const adsModel = require('../../model/ads')

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @return {void}
 */

module.exports = (req, res) => {
    const { id } = req.body
    const { user } = req.session

    adsModel.findOne({ publisher: user.id, _id: id }, (e, d) => {
        if (e) return res.status(500).json({ error: 'Something went wrong.' })

        res.json({ message: 'success', ad: d })
    })
}
