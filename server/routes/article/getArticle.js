const express = require('express')
const updateHistory = require('@/controllers/updateHistory')
const articleModel = require('@/model/article')
const Cache = require('@/controllers/Cache')
const getRelevantAudioAd = require('@/controllers/relevantAudioAd')
const crypto = require('crypto')

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @return {void}
 */

const getArticle = async (req, res) => {
    const { year, month, slug } = req.params

    const getArticle = async () =>
        await articleModel.aggregate([
            { $match: { year, month, slug } },
            {
                $lookup: {
                    from: 'users',
                    let: { id: '$createdBy' },
                    pipeline: [
                        {
                            $match: {
                                $expr: { $eq: ['$_id', '$$id'] },
                            },
                        },
                        { $project: { name: 1, _id: 0 } },
                    ],
                    as: 'author',
                },
            },
            { $unwind: { path: '$author' } },
        ])

    try {
        const article = await Cache(req.originalUrl, getArticle, {
            EX: 24 * 60 * 60,
        })

        if (!article || article?.length == 0)
            return res.status(400).json({ message: 'Article not found.' })

        const { begin, end } = await getRelevantAudioAd(
            req.cookies.user.history
        )

        const audioStreams = []
        if (begin) audioStreams.push(begin)
        if (article[0].audio) audioStreams.push(article[0]._id)
        if (end) audioStreams.push(end)
        const data = JSON.stringify(audioStreams)

        // Encrypt the data as key
        var audioKey
        if (!process.env.AUDIO_KEY) {
            console.debug('[!] AUDIO_KEY not found in env')
            console.debug(
                '[!] Using default AUDIO_KEY. Create one with `openssl -rand base64 32`'
            )
            audioKey = 'w+0s8w5H1oqlw5/3uCqDIDGUQ6RcJ0QFWXTm/5t+R98='
        } else {
            audioKey = process.env.AUDIO_KEY
        }

        const secret = Buffer.from(audioKey, 'base64')
        const cipher = crypto.createCipheriv('aes-256-ecb', secret, null)
        const key = Buffer.concat([cipher.update(data), cipher.final()])
        const params = new URLSearchParams()
        params.set('key', key.toString('base64'))
        article[0].audio = '/api/article/recite?' + params.toString()

        // Update category hits in user's history
        article[0]?.category.forEach(category => {
            // If the category doesnot exist then create
            if (!req.cookies.user.history.hasOwnProperty(category))
                req.cookies.user.history[category] = {
                    hits: 0,
                    likes: 0,
                    comments: 0,
                    watchtime: 0,
                }

            req.cookies.user.history[category].hits += 1
        })

        await updateHistory({ req, res })

        res.status(200).json(article[0])

        // Update article count in db
        await articleModel.updateOne(
            { year, month, slug },
            { $inc: { hits: 1 } }
        )
    } catch (err) {
        console.error(err)
        return res.status(500).json({ error: 'Something went wrong.' })
    }
}

module.exports = getArticle
