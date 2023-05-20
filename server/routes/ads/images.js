const express = require('express')
const adModel = require('@/model/ads')
const imageDimensionChecker = require('@/controllers/imageDimensionChecker')

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @return {void}
 */

module.exports = async (req, res) => {
    const { id, imageType } = req.query
    adModel.findOneAndUpdate(
        { _id: id },
        { $inc: { hits: 1 } },
        { image: 1 },
        (err, data) => {
            if (err) return res.status(404)
            if (!data) return res.status(404)

            const { type } = imageDimensionChecker(data.image[imageType])

            res.setHeader('Content-Type', type)
            res.send(data.image[imageType])
        }
    )
}
