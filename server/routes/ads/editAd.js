const express = require('express')

const adsModel = require('../../model/ads')
const calculateAdPrice = require('../../controllers/adPriceController')
const uploadAdAssets = require('../../controllers/uploadController')

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @return {void}
 */

module.exports = (req, res) => {
    const {
        name,
        publisher,
        category,
        redirectUrl,
        priority,
        _id,
        expiry: expiryDay,
        popup,
        imageX: imageXBody,
        imageY: imageYBody,
        imageSq: imageSqBody,
        audio: audioBody,
    } = req.body
    const { user } = req.session
    const { imageX, imageY, imageSq, audio } = req.files ? req.files : {}

    // Store urls to save in db
    const [image, audioUrl] =
        imageX || imageY || imageSq || audio
            ? uploadAdAssets(imageX, imageY, imageSq, audio)
            : []

    if (!user?.roles?.isRoot)
        return res.json({ error: 'Not enough permission to edit ads' })

    //
    // Verify and sanitize edited data
    //
    const data = {}
    if (name) data.name = name
    if (redirectUrl) data.redirectUrl = redirectUrl
    if (publisher) data.publisher = publisher
    if (priority) data.priority = priority
    if (popup) data.popup = popup === 'true'
    if (image) {
        if (!image.rectX) image.rectX = imageXBody
        if (!image.rectY) image.rectY = imageYBody
        if (!image.square) image.square = imageSqBody

        data.image = image
    }
    audioUrl ? (data.audio = audioUrl) : (data.audio = audioBody)
    if (category)
        data.category = category
            .split(',')
            .map(i => i.trim())
            .filter(i => i !== '')

    if (expiryDay) {
        data.expiry = new Date(Date.now() + expiryDay * 24 * 60 * 60 * 1000)
        data.price = calculateAdPrice({
            popup,
            expiry: data.expiry,
            priority: data.priority,
            audio: audioUrl,
        })
    }

    adsModel.updateOne({ _id }, data, (e, d) => {
        if (d === null)
            return res.status(401).json({ error: 'No such ad exists.' })

        if (e) {
            console.error(e)
            return res.status(500).json({ error: 'Something went wrong' })
        }

        res.json({ message: 'success' })
    })
}
