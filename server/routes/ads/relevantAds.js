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

const categoryStrength = {
    test: 0.6,
    duplicate: 0.4,
}

module.exports = async (req, res) => {
    const { page = 0, limit = 10 } = req.query

    const history = req.cookies?.user?.history || {}

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

    let maxStrength = 0

    Object.entries(categoryStrength).forEach(val => {
        categoryStrength[val[0]] = val[1] / totalStrength
        if (maxStrength < val[1] / totalStrength)
            maxStrength = val[1] / totalStrength
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
                        name: '$name',
                        priority: '$priority',
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
                _id: '$final._id',
                final: {
                    $first: {
                        name: '$final.name',
                        category: '$_id',
                        priority: '$final.priority',
                    },
                },
            },
        },
        {
            $group: {
                _id: '$final.category',
                final: {
                    $addToSet: {
                        name: '$final.name',
                        _id: '$_id',
                        priority: '$final.priority',
                    },
                },
            },
        },
        {
            $project: {
                final: {
                    $slice: ['$final', 10],
                },
            },
        },
    ])

    // Pass through all category
    // Filter only those category + limit respective numbers

    Object.entries(categoryAds).forEach(val => {
        // Set strength for response
        categoryAds[val[0]].strength = categoryStrength[val[1]._id]

        // Find max index to slice to
        let sliceMax = Math.floor(categoryStrength[val[1]._id] * limit)

        if (categoryStrength[val[1]._id] === maxStrength) sliceMax++

        // Slice ads number according to strength
        categoryAds[val[0]].final = categoryAds[val[0]].final
            .sort((a, b) => b.priority - a.priority)
            .slice(0, sliceMax)
    })

    console.log(categoryAds)

    res.json({
        message: 'success',
        ads: categoryAds.map(i => i.final).flat(2),
    })
}
