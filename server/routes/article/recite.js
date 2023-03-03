const articleModel = require('@/model/article')
const adsModel = require('@/model/ads')
const path = require('path')
const express = require('express')
const fs = require('fs')

const { calculateCategoryStrength } = require('@/routes/ads/relevantAds')

const audioAdFolder = path.resolve(__dirname, '../../assets/ads/audio/')

const ARTICLE_AUDIO_FOLDER = path.resolve(__dirname, "../../assets/article/audio")

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @return {void}
 */

const AD_LIMIT = 2

async function getRelevantAudioAd(history) {
    const { categoryStrength } = calculateCategoryStrength(history)
    const selectedAd = await adsModel.aggregate([
        {
            $match: {
                audio: {
                    $exists: true,
                },
                category: {
                    $in: Object.keys(categoryStrength),
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
            $group: {
                _id: '$category',
                final: {
                    $push: {
                        id: '$_id',
                        name: '$name',
                        priority: '$priority',
                        audio: '$audio',
                    },
                },
            },
        },
        {
            $unwind: {
                path: '$_id',
            },
        },
        {
            $unwind: {
                path: '$final',
            },
        },
        {
            $group: {
                _id: '$_id',
                final: {
                    $push: {
                        id: '$final.id',
                        name: '$final.name',
                        priority: '$final.priority',
                        audio: '$final.audio',
                    },
                },
            },
        },
    ])

    const allocatedAds = selectedAd.map(ad => {
        const maxAllocated = Math.round(categoryStrength[ad._id] * AD_LIMIT)
        const sliced = ad.final.slice(0, maxAllocated)
        return sliced
    }).flat()

    return {
        begin: audioAdFolder + '/' + (allocatedAds.at(0)?.audio || 'ad.mp3'),
        end: audioAdFolder + '/' + (allocatedAds.at(1)?.audio || 'ad.mp3'),
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

        const recitedArticle = fs.readFileSync( ARTICLE_AUDIO_FOLDER + "/" + article.audio)
        const { begin, end } = await getRelevantAudioAd(
            req?.cookies?.user?.history
        )
        //
        // There's a weird bug during playing the audio
        // Max seconds seems to increase if content is skipped
        // Only those audio which has been converted to mp3 using ffmpeg
        //
        const concatenationList = []
        if (begin) concatenationList.push(fs.readFileSync(begin))
        if (article) concatenationList.push(recitedArticle)
        if (end) concatenationList.push(fs.readFileSync(end))

        const concatenatedAudioContent = Buffer.concat(concatenationList)

        //
        // Not necessary now but
        // Instead of responding with concatenated audio
        // respond with audio stream chunk by chunk to make it available at once
        //
        return res.send({
            message: 'success',
            audio: concatenatedAudioContent.toString('base64'),
        })
    } catch (err) {
        console.error(err)
        return res.status(500).json({ error: 'Something went wrong.' })
    }
}
