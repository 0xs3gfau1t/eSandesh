const express = require('express')
const adsModel = require('../../model/ads')
const calculateAdPrice = require('@/controllers/adPriceController')
const convertToRaw = require('@/controllers/rawConverter.js')
const imageChecker = require('@/controllers/imageDimensionChecker')

const xHSize = 720
const yHSize = 110
const xVSize = yHSize
const yVSize = xHSize
const sqSize = 250

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

    const { imageX, imageY, imageSq, audio } = req.files || {}

    try {
        const categoryArray = category
            .split(',')
            .map(i => i.trim().toUpperCase())
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
            if (imageX) {
                const imageDetail = imageChecker(imageX.data)
                if (
                    imageDetail.width === xHSize &&
                    imageDetail.height === yHSize
                )
                    images.rectX = imageX.data
                else
                    throw Error(
                        `Invalid Image Size. ${xHSize}x${yHSize} for horizontal images`
                    )
            }
            if (imageY) {
                const imageDetail = imageChecker(imageY.data)
                if (
                    imageDetail.width === xVSize &&
                    imageDetail.height === yVSize
                )
                    images.rectY = imageY.data
                else
                    throw Error(
                        `Invalid Image Size. ${xVSize}x${yVSize} for horizontal images`
                    )
            }
            if (imageSq) {
                const imageDetail = imageChecker(imageSq.data)
                if (
                    imageDetail.width === sqSize &&
                    imageDetail.height === sqSize
                )
                    images.square = imageSq.data
                else
                    throw Error(
                        `Invalid Image Size. ${sqSize}x${sqSize} for horizontal images`
                    )
            }
            ad.image = images
        }

        await ad.save()
        res.json({ message: 'success' })
    } catch (e) {
        console.error(e)
        res.status(400).json({
            error: 'Something went wrong.',
            errMsg: e.message,
        })
    }
}
