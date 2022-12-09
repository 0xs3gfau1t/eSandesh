const express = require('express')

const adsModel = require('../../model/ads')

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @return {void}
 */

// First filter non expired ads
const strength = {
    hits: 0.1,
    likes: 0.2,
    comments: 0.4,
    watchtime: 0.3,
}

const categoryStrength = {}

module.exports = async (req, res) => {
    const { page = 0, limit = 10 } = req.query

    const history = req.cookies?.user?.history || {
        science: { hits: 100, comments: 10, likes: 20, watchtime: 30 },
        trtyety: { hits: 10, comments: 100, likes: 20, watchtime: 30 },
    }

    Object.keys(history).forEach(category => {
        const catStrength =
            strength.hits * history[category].hits +
            strength.likes * history[category].likes +
            strength.comments * history[category].comments +
            strength.watchtime +
            history[category].watchtime

        categoryStrength[category] = catStrength
    })

    const totalStrength = Object.values(categoryStrength).reduce(
        (a, v) => a + v,
        0
    )

    Object.entries(categoryStrength).forEach(async val => {
        categoryStrength[val[0]] = val[1] / totalStrength
    })
    console.log(categoryStrength)
    const categoryAds = await adsModel.aggregate([
        {
            $match: {
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
            $skip: page * limit,
        },
        {
            $group: {
                _id: '$category',
                final: {
                    $push: {
                        _id: '$_id',
                        imageEmbedUrl: '$imageEmbedUrl',
                        redirectUrl: '$redirectUrl',
                        size: '$size',
                        category: '$category',
                    },
                },
            },
        },
        {
            $project: {
                final: {
                    $slice: ['$final', limit],
                },
            },
        },
    ])

    console.log(categoryAds)

    res.json({
        message: 'success',
        ads: categoryAds,
        strength: categoryStrength,
    })
}
