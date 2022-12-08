const express = require('express')

const adsModel = require('../../model/ads')

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @return {void}
 */

module.exports = (req, res) => {
    const { name, publisher, embedUrl, priority, price, size } = req.body

    const { user } = req.session

    if (!user?.roles?.idRoot)
        return res.json({ error: 'Not enough permission to create ads' })

    adsModel.create(
        { name, publisher, embedUrl, priority, price, size },
        (e, d) => {
            if (e)
                return res.status(500).json({ error: 'Something went wrong.' })

            res.json({ message: 'success' })
        }
    )
}
