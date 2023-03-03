const articleModel = require('@/model/article')
const adsModel = require('@/model/ads')
const path = require('path')
const fs = require('fs')
const express = require('express')
const { calculateCategoryStrength } = require('@/routes/ads/relevantAds')

const audioAdFolder = path.resolve(__dirname, '../../assets/ads/audio/')

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @return {void}
 */

async function getRelevantAudioAd(history) {
    console.log('Determining best audio ad with history: ', history)

    const { categoryStrength, maxStrength } = calculateCategoryStrength(history)
    const selectedAd = await adsModel.aggregate([
        {
            $match: {
                audio: {
                    $exists: true,
                },
                category: {
                    $in: ['POLITICS', 'SPORTS', 'FINANCE'],
                },
            },
        },
        {
            $sort: {
                priority: -1,
            },
        },
        {
            $skip: 0 * 10,
        },
        {
            $project: {
                _id: true,
                name: true,
                audio: true,
                priority: true,
            },
        },
        {
            $sort: {
                priority: -1,
            },
        },
    ])

    return {
        begin: audioAdFolder + '/' + selectedAd.at(0)?.audio || 'ad.mp3',
        end: audioAdFolder + '/' + selectedAd.at(1)?.audio || 'ad.mp3',
    }
}

module.exports = async (req, res) => {
    const { year, month, slug } = req.query

    try {
        const article = await articleModel.findOne(
            { year, month, slug },
            { audio: true }
        )

        if (!article) return res.json({ error: 'No such article found' })

        const recitedArticle = fs.readFileSync(article.audio)
        const { begin, end } = await getRelevantAudioAd(
            req?.cookies?.user?.history
        )

        console.log('Begin: ', begin, 'End: ', end)

        const concatenationList = []
        if (begin) concatenationList.push(fs.readFileSync(begin))
        if (article) concatenationList.push(recitedArticle)
        if (end) concatenationList.push(fs.readFileSync(end))
        const concatenatedAudioContent = Buffer.concat(concatenationList)

        return res.send({
            message: 'success',
            audio: concatenatedAudioContent.toString('base64'),
        })
    } catch (err) {
        console.error(err)
        return res.status(500).json({ error: 'Something went wrong.' })
    }
}
