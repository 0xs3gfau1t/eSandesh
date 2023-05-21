const express = require('express')
const { default: mongoose } = require('mongoose')
const typeToModelMap = require('./_type_to_model')
const Cache = require('@/controllers/Cache')

const {
    metaModel,
    adsStatModel,
    articleStatModel,
    commentStatModel,
    pollStatModel,
    userStatModel,
} = require('@/model/stats')

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
const download = async (req, res) => {
    const { metaId } = req.query

    const mid = mongoose.Types.ObjectId(metaId)

    const downloadData = async () => {
        const filter = { metaId: mid }
        const data = {
            meta: await metaModel.find({ _id: mid }),
            ads: await adsStatModel.find(filter),
            stats: await articleStatModel.find(filter),
            comments: await commentStatModel.find(filter),
            polls: await pollStatModel.find(filter),
            users: await userStatModel.find(filter),
        }
        return data
    }
    try {
        const data = await Cache(`report-${metaId}.json`, downloadData, {
            EX: 60 * 60,
        })
        const dataStr = JSON.stringify(data, null, 4)
        res.setHeader(
            'Content-disposition',
            `attachment; filename= report-${metaId}.json`
        )
        res.setHeader('Content-type', 'application/json')
        res.write(dataStr, () => {
            res.end()
        })
    } catch (err) {
        console.error(err)
        return res.status(500).json({ error: 'Something went wrong' })
    }
}

module.exports = download
