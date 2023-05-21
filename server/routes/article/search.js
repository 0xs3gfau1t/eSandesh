const articleModel = require('@/model/article')
const express = require('express')

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @return {void}
 */
const searchHandler = async (req, res) => {
    const { q, sort, order, author, skip = 0, limit = 10 } = req.query

    const aggregationStage = []

    if (q?.length > 0)
        aggregationStage.push({
            $match: { $text: { $search: q }, archived: { $exists: false } },
        })

    aggregationStage.push(
        {
            $project: {
                title: 1,
                category: 1,
                year: 1,
                month: 1,
                slug: 1,
                createdAt: 1,
                hits: 1,
                img: 1,
                user: '$createdBy',
            },
        },
        {
            $lookup: {
                from: 'users',
                let: { id: '$user' },
                pipeline: [
                    {
                        $match: {
                            $expr: { $eq: ['$_id', '$$id'] },
                        },
                    },
                    { $project: { name: 1, _id: 0 } },
                ],
                as: 'user',
            },
        },
        { $unwind: { path: '$user', preserveNullAndEmptyArrays: true } }
    )

    if (author)
        aggregationStage.push({
            $match: { 'user.name': { $regex: author, $options: 'i' } },
        })

    if (sort) aggregationStage.push({ $sort: { [sort]: Number(order) || -1 } })

    aggregationStage.push({ $skip: Number(skip) }, { $limit: Number(limit) })

    try {
        const articles = await articleModel.aggregate(aggregationStage)
        return res.json({
            data: articles,
            nextCursor: articles.length < limit ? -1 : skip + articles.length,
        })
    } catch (err) {
        console.error(err)
        return res.status(500).json({ error: 'Something went wrong' })
    }
}

module.exports = searchHandler
