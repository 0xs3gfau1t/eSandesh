const express = require('express')

const { calculateCategoryStrength } = require('@/routes/ads/relevantAds')

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @return {void}
 */
const DEFAULT_CATEGORIES = ['POLITICS', 'FINANCE', 'GLOBAL', 'SPORTS']

module.exports = (req, res) => {
    try {
        const sortedCategories = Object.fromEntries(
            Object.entries(
                calculateCategoryStrength(req.cookies?.user?.history)
            ).sort(([, value1], [, value2]) => value2 - value1)
        )

        const prevs = Object.keys(sortedCategories)

        let finalCategories = [...prevs]
        if (prevs.length < 4) {
            const remainingElements = DEFAULT_CATEGORIES.filter(
                element => !prevs.includes(element)
            )
            finalCategories.push(
                ...remainingElements.slice(0, 4 - prevs.length)
            )
        }

        res.json({
            message: 'success',
            categories: finalCategories,
        })
    } catch (e) {
        console.error(e)
        res.status(500).json({ message: 'Something went wrong' })
    }
}
