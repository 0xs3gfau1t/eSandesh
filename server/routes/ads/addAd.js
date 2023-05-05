const express = require('express')
const adsModel = require('../../model/ads')
const calculateAdPrice = require('@/controllers/adPriceController')
const convertToRaw = require('@/controllers/rawConverter.js')

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @return {void}
 */

module.exports = async (req, res) => {
    // Always check first
    const { user } = req.session
    if (!user?.roles?.isRoot)
        return res
            .status(403)
            .json({ error: 'Not enough permission to create ads' })

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

    try {
        const categoryArray = category
            .split(',')
            .map(i => i.trim())
            .filter(i => i !== '')

        const expiry = new Date(Date.now() + expiryDay * 24 * 60 * 60 * 1000)
        const price = calculateAdPrice({
            popup,
            priority,
            expiry,
            audio,
        })
        const ad = await adsModel({
            name,
            publisher,
            redirectUrl,
            priority,
            price,
            expiry,
            category: categoryArray,
            popup,
        })

        if (audio) {
            if (audio.size / 1024 ** 2 > 2)
                return res.status(411).json({ message: 'Audio size too large' })
            ad.audio = await convertToRaw(audio.data)
        }

        // Now store available images
        if (imageY || imageX || imageSq) {
            const images = {}
            if (imageX) images.rectX = imageX.data
            if (imageY) images.rectY = imageY.data
            if (imageSq) images.square = imageSq.data
            ad.image = images
        }

        await ad.save()
        res.json({ message: 'success' })
    } catch (e) {
        console.error(e)
        res.status(500).json({ error: 'Something went wrong.' })
    }
}
