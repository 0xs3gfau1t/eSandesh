const express = require('express')
const articleModel = require('@/model/article')
const { ObjectId } = require('mongodb')

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */

const defaultDayRange = 90 // 1 Month

module.exports = async (req, res) => {
    const {
        dateFrom,
        dateTo,
        limit = 10,
        page = 0,
        createdBy,
        categories,
    } = req.query

    let categoryArray = String(categories)
        ?.split(',')
        ?.map(i => String(i)?.trim()?.toUpperCase())

    //
    // Prepare filter queried
    //
    filter = {
        publishedAt: {},
        archived: { $exists: true },
    }
    if (createdBy) filter.createdBy = ObjectId(String(createdBy))
    if (dateFrom)
        filter.publishedAt['$gte'] =
            dateFrom || new Date(Date.now() - defaultDayRange * 24 * 60 * 60000)
    if (dateTo) filter.publishedAt['$lte'] = dateTo || new Date()
    if (categoryArray.length) filter.category = { $all: categoryArray }

    try {
        articleModel
            .find(filter)
            .skip(limit * page)
            .limit(limit)
            .exec((e, docs) => {
                if (e)
                    return res
                        .status(500)
                        .json({ message: 'Something went wrong' })
                if (!docs)
                    return res.status(404).json({ message: 'No any matched' })

                res.json({ message: 'success', docs })
            })
    } catch (e) {
        console.error(e)
        res.status(500).json({ message: 'Something went wrong' })
    }
}
