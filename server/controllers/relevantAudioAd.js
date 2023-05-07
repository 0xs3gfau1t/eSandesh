const adsModel = require('@/model/ads')

const { calculateCategoryStrength } = require('@/routes/ads/relevantAds')
const AD_LIMIT = 2

async function getRelevantAudioAd(history) {
    const { categoryStrength } = calculateCategoryStrength(history)
    const selectedAd = await adsModel.aggregate([
        {
            $facet: {
                withCategory: [
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
                                    _id: '$final.id',
                                    name: '$final.name',
                                    priority: '$final.priority',
                                    audio: '$final.audio',
                                },
                            },
                        },
                    },
                ],
                withOutCategory: [
                    {
                        $match: {
                            audio: {
                                $exists: true,
                            },
                        },
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
                                    _id: '$final.id',
                                    name: '$final.name',
                                    priority: '$final.priority',
                                    audio: '$final.audio',
                                },
                            },
                        },
                    },
                ],
            },
        },
        {
            $project: {
                result: {
                    $concatArrays: [
                        '$withCategory',
                        {
                            $cond: {
                                if: {
                                    $eq: [{ $size: '$withCategory' }, 0],
                                },
                                then: '$withOutCategory',
                                else: [],
                            },
                        },
                    ],
                },
            },
        },
        { $unwind: '$result' },
        { $replaceRoot: { newRoot: '$result' } },
    ])

    let totalAvailableAds = 0
    const allocatedAds = selectedAd
        .map(ad => {
            const maxAllocated = Math.round(categoryStrength[ad._id] * AD_LIMIT)
            const sliced = ad.final.slice(0, maxAllocated)
            totalAvailableAds += ad.final.length
            return sliced
        })
        .flat()
    let freeSpace = AD_LIMIT - allocatedAds.length
    while (freeSpace) {
        // This variable will include ads in increasing order from final set
        let selectedAdIndex = 0
        // If relevant ads donot fill quota, travel through again and add
        selectedAd.forEach(ad => {
            if (freeSpace) {
                allocatedAds.push(ad.final[selectedAdIndex])
                freeSpace--
            } else return
        })
        selectedAdIndex++
    }

    return {
        begin: allocatedAds.at(0)?._id || 'ffffffffffffffffffffffff',
        end: allocatedAds.at(1)?._id || 'ffffffffffffffffffffffff',
    }
}

module.exports = getRelevantAudioAd
