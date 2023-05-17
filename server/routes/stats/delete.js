const {
    metaModel,
    adsStatModel,
    articleStatModel,
    commentStatModel,
    pollStatModel,
    userStatModel,
} = require('@/model/stats')
const express = require('express')
const { default: mongoose } = require('mongoose')

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
const deleteStat = async (req, res) => {
    const metaId = req.body.metaId

    if (!metaId) return res.status(400).json({ erro: 'Missing Meta Id' })

    try {
        const mid = mongoose.Types.ObjectId(metaId)
        const delFilter = { metaId: mid }

        await Promise.all([
            metaModel.deleteMany({ _id: mid }),
            adsStatModel.deleteMany(delFilter),
            articleStatModel.deleteMany(delFilter),
            commentStatModel.deleteMany(delFilter),
            pollStatModel.deleteMany(delFilter),
            userStatModel.deleteMany(delFilter),
        ])

        return res.status(200).end()
    } catch (err) {
        console.error(err)
        return res.status(500).json({ error: 'Something went wrong' })
    }
}

module.exports = deleteStat
