const Cache = require('@/controllers/Cache')
const express = require('express')

const adsModel = require('../../model/ads')

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @return {void}
 */

module.exports = async (req, res) => {
    const { id } = req.query

    //
    // Returned function to provide facilitate parameterized middlewares
    //
    const fetchAd = id => async () => await adsModel.findOne({ _id: id })

    try {
        const ad = await Cache(req.originalUrl, fetchAd(id), { EX: 60 * 60 })
        return res.status(200).json({ message: 'success', ad })
    } catch (err) {
        console.error(err)
        return res.status(500).json({ error: 'Something went wrong.' })
    }
}
