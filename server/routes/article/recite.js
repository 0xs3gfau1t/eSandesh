const articleModel = require('@/model/article')
const adsModel = require('@/model/ads')
const path = require('path')
const express = require('express')
const fs = require('fs')

const { calculateCategoryStrength } = require('@/routes/ads/relevantAds')

const audioAdFolder = path.resolve(__dirname, '../../assets/ads/audio/')

const ARTICLE_AUDIO_FOLDER = path.resolve(
    __dirname,
    '../../assets/article/audio'
)

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

    const allocatedAds = selectedAd
        .map(ad => {
            const maxAllocated = Math.round(categoryStrength[ad._id] * AD_LIMIT)
            const sliced = ad.final.slice(0, maxAllocated)
            return sliced
        })
        .flat()

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

        const recitedArticle = ARTICLE_AUDIO_FOLDER + '/' + article.audio
        const { begin, end } = await getRelevantAudioAd(
            req?.cookies?.user?.history
        )

        let finalSize = fs.statSync(begin).size
        const frontAudio = fs.createReadStream(begin)
        finalSize += fs.statSync(recitedArticle).size
        const articleAudio = fs.createReadStream(recitedArticle, {
            highWaterMark: 1024,
        })
        finalSize += fs.statSync(end).size
        const endAudio = fs.createReadStream(end, { highWaterMark: 1024 })

        res.writeHead(200, {
            'Content-Length': finalSize,
            'Content-Range': 'bytes 0-' + finalSize + '/' + finalSize,
            'Content-Type': 'audio/mp3',
        })

        frontAudio.pipe(res, { end: false })
        frontAudio.on('end', () => {
            articleAudio.pipe(res, { end: false })
            articleAudio.on('end', () => {
                endAudio.pipe(res)
            })
        })
    } catch (err) {
        console.error(err)
        return res.status(500).json({ error: 'Something went wrong.' })
    }
}
