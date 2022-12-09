const express = require('express')

const adsModel = require('../../model/ads')

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @return {void}
 */

//
// This route is for ad publisher
// If the ad publisher tries to view other publishers ads
// That wont work and only his/hers ads will be returned
//
module.exports = (req, res) => {
    const { category, publisher } = req.body
    const { user } = req.session

    const filters = { category: category }

    if (user.roles.isRoot) filters.publisher = publisher
    else filters.publisher = user.id

    adsModel.find(filters, (e, d) => {
        if (e) return res.status(500).json({ error: 'Something went wrong.' })

        res.json({ message: 'success', ad: d })
    })
}
