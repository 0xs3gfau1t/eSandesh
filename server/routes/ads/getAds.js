const express = require('express')

const adsModel = require('../../model/ads')

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @return {void}
 */

module.exports = (req, res) => {
    const { category, publisher } = req.body
    const { user } = req.session

    const filters = { category: category }

    if (!user.session.roles.isRoot) filters['publisher'] = user.id
    else filters['publisher'] = publisher

    adsModel.find(filters, (e, d) => {
        if (e) return res.status(500).json({ error: 'Something went wrong.' })

        res.json({ message: 'success', ad: d })
    })
}
