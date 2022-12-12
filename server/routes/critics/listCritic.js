const express = require('express')
const criticModel = require('../../model/critics')

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @return {void}
 */

//
// Top critics are those with high likes and subcomments
//
module.exports = async (req, res) => {
    const { category, page = 0, limit = 10, timeRange = 1 } = req.query

    //
    // Bholi implement hanchu category wala critics
    //
    const timeFilter = new Date(
        new Date() - timeRange * 30 * 24 * 60 * 60 * 1000
    ).toISOString()

    const d = await criticModel
        .find({
            createdAt: { $gt: timeFilter },
        })
        .sort({ likes: -1 })
        .skip(page)
        .limit(limit)

    res.json({ message: 'success', doc: d })
}
