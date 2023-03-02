const express = require('express')
const adsModel = require('../../model/ads')
const uploadAdAssets = require('../../controllers/uploadController')
const calculateAdPrice = require('../../controllers/adPriceController')

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @return {void}
 */

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
        expiry: expiryDay,
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

    const expiry = new Date(Date.now() + expiryDay * 24 * 60 * 60 * 1000)
    const price = calculateAdPrice({ popup, priority, expiry, audio: audioUrl })
    console.log(price)
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
