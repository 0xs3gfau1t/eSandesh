const express = require('express')
const articleModel = require('../../model/article')

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @returns {express.Response}
 */
const toPublish = async (req, res) => {
    const {
        page = 0,
        items = 10,
        sortBy = 'hits',
        normalUser = false,
    } = req.query

    try {
        let matchQuery = { roles: { $exists: false } }
        if (normalUser === false)
            matchQuery = {
                roles: { $exists: true },
                'roles.isReporter': true,
            }

        const articles = await articleModel.aggregate([
            {
                $match: { publishedAt: { $exists: false } },
            },
            {
                $project: {
                    title: true,
                    updatedAt: true,
                    year: true,
                    month: true,
                    slug: true,
                    createdBy: true,
                },
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'createdBy',
                    foreignField: '_id',
                    as: 'userInfo',
                    pipeline: [
                        {
                            $match: matchQuery,
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
                $unwind: { path: '$userInfo' },
            },
            {
                $sort: {
                    [sortBy]: -1,
                },
            },
            {
                $skip: parseInt(page) * parseInt(items),
            },
            {
                $limit: parseInt(items),
            },
        ])
        return res.json({ message: 'success', articles })
    } catch (err) {
        console.error(err)
        return res.status(500).json({ error: 'Something went wrong.' })
    }
}

module.exports = toPublish
