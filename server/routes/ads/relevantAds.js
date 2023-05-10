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

    console.log('History: ', history)
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

    console.log('Strength: ', categoryStrength)
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
    if (['rectX', 'rectY', 'square'].includes(imageType))
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
                        redirectUrl: '$redirectUrl',
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
                        redirectUrl: '$final.redirectUrl',
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
                        redirectUrl: '$final.redirectUrl',
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

    //
    // This variable is used later to cover all unique ads
    //
    let maxIndexToWhichAdIsAvailable = -1

    let freeSpace = limit
    const finalCategoryAds = [] // {}
    categoryAds.forEach(cat => {
        let totalNeededAds = Math.round(categoryStrength[cat._id] * limit)
        let adIndex = 0

        // finalCategoryAds[cat._id] = []

        //
        // First fill distributed ads for category cat
        //
        while (totalNeededAds-- > 0 && freeSpace-- > 0) {
            // finalCategoryAds[cat._id].push(cat.final[adIndex])
            finalCategoryAds.push(cat.final[adIndex])

            if (maxIndexToWhichAdIsAvailable < adIndex)
                maxIndexToWhichAdIsAvailable = adIndex

            adIndex = adIndex >= cat.final.length - 1 ? 0 : adIndex + 1
        }
    })

    //
    //If requested amount of ads are not generated, loop over queried ads then push ads in incremental order
    //
    let adIndex = 0
    while (freeSpace > 0) {
        categoryAds.some(cat => {
            if (freeSpace <= 0) return true
            //
            // If this category ad list elements' size is less then adIndex
            // then skip this category otherwise indexRangeExceeded error will be thrown
            //
            if (cat.final.length <= adIndex) return

            // finalCategoryAds[cat._id].push(cat.final[adIndex])
            finalCategoryAds.push(cat.final[adIndex])
            freeSpace--

            //
            // Check to see if no any ad list contains greater elements than current adIndex
            // Unable to check will throw indexRangeExceeded error
            // And we have still to cover all unique ads instead of repeating
            //
            if (adIndex >= maxIndexToWhichAdIsAvailable) adIndex = 0
            else adIndex++
        })
    }

    res.json({
        message: 'success',
        ads: finalCategoryAds,
    })
}

module.exports.calculateCategoryStrength = calculateCategoryStrength
