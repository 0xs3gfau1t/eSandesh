const express = require('express')

const adsModel = require('@/model/ads')

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @return {void}
 */

//
// Issue with less priority ad starvation
// Projected solution 1:
//      - Keep track of ad hits
//      - For every threshold hit for ad A of priority 10, TxA
//      - Exclude it from next GET /relevant and give chance for ad B of priority 9
//      - Then again for TxA, serve A
//      - Then exclude it from next GET
//      - Continue cycle until TxB hits
//      - Then exclude A then B and serve C in next GET /relevant
//
// Projected solution 2: (Make use of page/limit
//      - Keep track of ad hits for page0xlimit
//      - Serve this combination until threshold hits reaches for page0xlimit
//      - Serve another combination page1xlimit until until it's threshold reaches
//      - Configure different threshold with threshold decreasing as we increase page number
//      - This configuration because we sort by priority during skip
//

// First filter non expired ads
const strength = {
    hits: 0.1,
    likes: 0.2,
    comments: 0.4,
    watchtime: 0.3,
}

function calculateCategoryStrength(history) {
    const categoryStrength = {}

    if (history instanceof Map) history = Object.fromEntries(history)

    Object.keys(history).forEach(category => {
        const catStrength =
            strength.hits * history[category].hits +
            strength.likes * history[category].likes +
            strength.comments * history[category].comments +
            strength.watchtime +
            history[category].watchtime

        categoryStrength[category] = catStrength
    })
    /*
     * history.forEach((value, key) => {
        categoryStrength[key] =
            strength.hits * value.hits +
            strength.likes * value.likes +
            strength.comments * value.comments +
            strength.watchtime * value.watchtime
    })
    */

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
    return { categoryStrength, maxStrength }
}

module.exports = async (req, res) => {
    const { page = 0, limit = 10 } = req.query
    let { imageType = 'image' } = req.query

    const history = req.cookies.user.history

    const { categoryStrength, maxStrength } = calculateCategoryStrength(history)

    const matchQuery = {}

    // Prepare match query for categories filtering
    // If no categories specified, dont set filter
    const categories = Object.keys(categoryStrength)
    if (categories.length !== 0)
        matchQuery['category'] = {
            $in: categories,
        }

    // Prepare match query for imageType filtering
    // If no imageType specified, just filter those ads in which image field exists
    if (['rextX', 'rectY', 'square'].includes(imageType))
        imageType = 'image.' + imageType
    matchQuery[imageType] = { $exists: true }

    const categoryAds = await adsModel.aggregate([
        {
            $match: matchQuery,
        },
        {
            $project: {
                audio: 0,
                image: 0,
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

    // If limit reaches the first iteration, break
    // else, loop again to include ads with sliceMax=0
    // until limit reaches, then break
    // if availableSpace >= availableItem, include all. Havent distributed according to top priority
    let filteredAdsNumber = 0
    const finalCategoryAds = categoryAds.map(ci => {
        return { _id: ci._id, final: [] }
    })
    for (let i = 0; i < 2; i++) {
        Object.entries(categoryAds).forEach(val => {
            // Set strength for response
            finalCategoryAds[val[0]].strength = categoryStrength[val[1]._id]

            // Find max index to slice to
            let sliceMax = Math.round(categoryStrength[val[1]._id] * limit)
            if (filteredAdsNumber < limit && i === 1 && sliceMax === 0) {
                const availableItems = categoryAds[val[0]].final.length
                if (limit - filteredAdsNumber <= 0) return
                else if (limit - filteredAdsNumber <= availableItems)
                    sliceMax = limit - filteredAdsNumber
                else sliceMax = availableItems
            }

            // Slice ads number according to strength
            finalCategoryAds[val[0]]['final'] = categoryAds[val[0]].final
                .sort((a, b) => b.priority - a.priority)
                .slice(0, sliceMax)
            filteredAdsNumber += finalCategoryAds[val[0]].final.length
        })
        if (limit === filteredAdsNumber) break
    }
    res.json({
        message: 'success',
        ads: categoryAds.map(i => i.final).flat(2),
    })
}

module.exports.calculateCategoryStrength = calculateCategoryStrength
