const express = require('express')

const adsModel = require('../../model/ads')
const calculateAdPrice = require('../../controllers/adPriceController')

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @return {void}
 */

module.exports = async (req, res) => {
    const {
        name,
        publisher,
        category,
        redirectUrl,
        priority,
        _id,
        expiry: expiryDay,
        popup,
    } = req.body
    const { user } = req.session
    const { imageX, imageY, imageSq, audio } = req.files ? req.files : {}

    // Store urls to save in db
    if (!user?.roles?.isRoot)
        return res.json({ error: 'Not enough permission to edit ads' })

    //
    // Verify and sanitize edited data
    //
    const data = await adsModel.findOne({ _id }, { audio: 0 })
    if (name) data.name = name
    if (redirectUrl) data.redirectUrl = redirectUrl
    if (publisher) data.publisher = publisher
    if (priority) data.priority = priority
    if (popup) data.popup = popup === 'true'
    if (imageX || imageY || imageSq) {
        const images = data.image || {}
        if (imageX) images.rectX = imageX.data
        if (imageY) images.rectY = imageY.data
        if (imageSq) images.square = imageSq.data
        data.image = images
    }
    if (audio) {
        if (audio.data.size / 1024 ** 2 > 2)
            return res.status(411).json({ message: 'Audio size too large' })
        data.audio = audio.data
    }
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
            audio: data.audio,
        })
    }

    await adsModel.updateOne({ _id }, data, (e, d) => {
        if (d === null)
            return res.status(401).json({ error: 'No such ad exists.' })

        if (e) {
            console.error(e)
            return res.status(500).json({ error: 'Something went wrong' })
        }

        res.json({ message: 'success' })
    })
}
