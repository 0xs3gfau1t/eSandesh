const express = require('express')
const adsModel = require('../../model/ads')
const uploadAdAssets = require('../../controllers/uploadController')
/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @return {void}
 */

const normalPricePerMinute = 100
const midPriority = 5

module.exports = (req, res) => {
    // Always check first
    const { user } = req.session
    if (!user?.roles?.isRoot)
        return res.json({ error: 'Not enough permission to create ads' })

    const {
        name,
        publisher /*= user.id*/,
        redirectUrl,
        priority,
        expiry,
        category,
        popup = false,
    } = req.body

    const { imageX, imageY, imageSq, audio } = req.files

    // Store urls to save in db
    const [image, audioUrl] = uploadAdAssets(imageX, imageY, imageSq, audio)

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
            (audioPriceAdjustmentFactor + popup * 2)
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
            audio: audioUrl,
        },
        (e, d) => {
            if (e) {
                console.error(e)
                return res.status(500).json({ error: 'Something went wrong.' })
            }
            res.json({ message: 'success' })
        }
    )
}
