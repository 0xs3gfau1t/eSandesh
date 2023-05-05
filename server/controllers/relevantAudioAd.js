const adsModel = require('@/model/ads')

const { calculateCategoryStrength } = require('@/routes/ads/relevantAds')
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
        begin: allocatedAds.at(0)?.audio || 'ffffffffffffffffffffffff',
        end: allocatedAds.at(1)?.audio || 'ffffffffffffffffffffffff',
    }
}

module.exports = getRelevantAudioAd
