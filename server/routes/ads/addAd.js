const express = require('express')

const adsModel = require('../../model/ads')

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @return {void}
 */

const normalPricePerMinute = 1000
const midPriority = 5

module.exports = (req, res) => {
    const {
        name,
        publisher /*= user.id*/,
        image, //{type: url}
        redirectUrl,
        priority,
        expiry,
        category,
        popup = false,
        audio,
    } = req.body

    const { user } = req.session

    if (!user?.roles?.isRoot)
        return res.json({ error: 'Not enough permission to create ads' })

    const categoryArray = category
        .split(',')
        .map(i => i.trim())
        .filter(i => i !== '')

    const minutesLeft = (new Date(expiry) - new Date()) / (1000 * 60)

    // We can do better here by analyzing which category the ad falls
    // Then check performance of this category in db
    // Then adjust the formula to adjust price by
    // considering how much users click the ad
    const audioPriceAdjustmentFactor = audio ? 1.5 : 1
    const price = Math.round(
        ((minutesLeft * normalPricePerMinute * priority) / midPriority) *
            audioPriceAdjustmentFactor
    )

    adsModel.create(
        {
            name,
            publisher,
            image,
            redirectUrl,
            priority,
            price,
            expiry,
            category: categoryArray,
            popup,
            audio,
        },
        (e, d) => {
            if (e)
                return res.status(500).json({ error: 'Something went wrong.' })

            res.json({ message: 'success' })
        }
    )
}
