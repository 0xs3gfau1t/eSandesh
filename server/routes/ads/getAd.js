const Cache = require('@/controllers/Cache')
const express = require('express')

const adsModel = require('../../model/ads')

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @return {void}
 */

module.exports = async (req, res) => {
    const { id } = req.body
    const { user } = req.session

    const fetchAd = async () =>
        await adsModel.findOne({ publisher: user.id, _id: id })

    try {
        const ad = await Cache(req.originalUrl, fetchAd, { 'EX': 60 * 60 })
        return res.status(200).json({ message: 'success', ad })
    } catch (err) {
        console.error(err)
        return res.status(500).json({ error: 'Something went wrong.' })
    }
}
