const express = require('express')
const articleModel = require('@/model/article')
const { ObjectId } = require('mongodb')
const { create } = require('@/model/article')

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */

const defaultDayRange = 1000 // 6 Month

module.exports = async (req, res) => {
    const {
        dateFrom,
        dateTo,
        limit = 10,
        page = 0,
        categories,
        title,
    } = req.query
    let { createdBy, authorMatch = {} } = req.query

    let categoryArray = categories
        ? String(categories)
              ?.split(',')
              ?.map(i => String(i)?.trim()?.toUpperCase())
        : []

    //
    // Prepare filter queried
    //
    filter = {
        publishedAt: {
            $gte: new Date(Date.now() - defaultDayRange * 24 * 60 * 60000),
            $lte: new Date(),
        },
        archived: { $exists: true },
    }
    if (createdBy && createdBy !== '')
        authorMatch = {
            name: createdBy,
        }
    if (title) filter.title = { $regex: `${title}` }
    if (dateFrom) filter.publishedAt['$gte'] = new Date(dateFrom)
    if (dateTo) filter.publishedAt['$lte'] = new Date(dateTo)
    if (categoryArray.length) filter.category = { $all: categoryArray }

    try {
        const archives = await articleModel.aggregate([
            {
                $match: filter,
            },
            {
                $skip: limit * page,
            },
            {
                $limit: Number(limit),
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'createdBy',
                    foreignField: '_id',
                    as: 'userInfo',
                    pipeline: [
                        {
                            $match: authorMatch,
                        },
                        {
                            $project: {
                                name: true,
                                _id: false,
                            },
                        },
                    ],
                },
            },
            {
                $unwind: { path: '$userInfo' },
            },
            {
                $project: {
                    title: true,
                    publishedAt: true,
                    category: true,
                    year: true,
                    month: true,
                    slug: true,
                    'userInfo.name': true,
                },
            },
        ])
        res.json({ message: 'success', archives })
    } catch (e) {
        console.error(e)
        res.status(500).json({ message: 'Something went wrong' })
    }
}
