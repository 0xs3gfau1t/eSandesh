const express = require('express')

const adsModel = require('../../model/ads')

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @return {void}
 */

module.exports = (req, res) => {
    const { name, publisher, embedUrl, priority, price, size, id } = req.body
    const { user } = req.session

    if (!req.session.roles.isRoot)
        return res.json({ error: 'Not enough permission to edit ads' })

    // Currently only the creator of ads can remove ads and noone else
    // Not even root
    adsModel.findOneAndUpdate(
        { publisher: user.id, _id: id },
        { name, embedUrl, priority, price, size },
        (e, d) => {
            if (e)
                return res.status(500).json({ error: 'Something went wrong.' })

            res.json({ message: 'success' })
        }
    )
}
