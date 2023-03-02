const articleModel = require('../../model/article')
const path = require('path')
const fs = require('fs')
const express = require('express')

const audioAdFolder = path.resolve(__dirname, '../../assets/ads/audio/')

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @return {void}
 */

function getRelevantAudioAd(history) {
    console.log('Determining best audio ad with history: ', history)
    return fs.readFileSync(audioAdFolder + '/' + 'ad.mp3')
}

module.exports = async (req, res) => {
    const { year, month, slug } = req.query

    try {
        const article = await articleModel.findOne(
            { year, month, slug },
            { audio: true }
        )

        if (!article) return res.json({ error: 'No such article found' })

        const sound = fs.readFileSync(article.audio)

        const ad = getRelevantAudioAd(req?.cookies?.user?.history)

        const concatenated = Buffer.concat([ad, sound])
        return res.send({
            message: 'success',
            audio: concatenated.toString('base64'),
        })
    } catch (err) {
        console.error(err)
        return res.status(500).json({ error: 'Something went wrong.' })
    }
}
