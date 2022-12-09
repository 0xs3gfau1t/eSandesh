const express = require('express')

const adsModel = require('../../model/ads')

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @return {void}
 */

module.exports = (req, res) => {
    const { user } = req.session

    const {
        name,
        publisher = user.id,
        imageEmbedUrl,
        redirectUrl,
        priority,
        price,
        size,
        expiry,
        category,
    } = req.body

    if (!user?.roles?.isRoot)
        return res.json({ error: 'Not enough permission to create ads' })

    const categoryArray = category
        .split(',')
        .map(i => i.trim())
        .filter(i => i !== '')

    adsModel.create(
        {
            name,
            publisher,
            imageEmbedUrl,
            redirectUrl,
            priority,
            price,
            size,
            expiry,
            category: categoryArray,
        },
        (e, d) => {
            if (e)
                return res.status(500).json({ error: 'Something went wrong.' })

            res.json({ message: 'success' })
        }
    )
}
