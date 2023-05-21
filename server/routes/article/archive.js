const express = require('express')
const articleModel = require('@/model/article')

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */

const defaultDayRange = 1000 // 6 Month

module.exports = async (req, res) => {
    const { dateFrom, dateTo, limit = 0, page = 0, category, title } = req.query
    let { author, authorMatch = {} } = req.query

    let categoryArray = category
        ? String(category)
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
    if (author && author !== '')
        authorMatch = {
            name: author,
        }
    if (title) filter.title = { $regex: title }
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
                    as: 'author',
                    pipeline: [
                        {
                            $match: authorMatch,
                        },
                        {
                            $project: {
                                name: true,
                            },
                        },
                    ],
                },
            },
            {
                $unwind: { path: '$author' },
            },
            {
                $project: {
                    title: true,
                    publishedAt: true,
                    category: true,
                    year: true,
                    month: true,
                    slug: true,
                    'author.name': true,
                },
            },
        ])
        res.json({ message: 'success', archives })
    } catch (e) {
        console.error(e)
        res.status(500).json({ message: 'Something went wrong' })
    }
}
