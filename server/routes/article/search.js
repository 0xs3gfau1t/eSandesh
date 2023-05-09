const articleModel = require('@/model/article')
const express = require('express')

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @return {void}
 */
const searchHandler = async (req, res) => {
    const { q, sort, order, author } = req.query

    const aggregationStage = []

    if (q?.length > 0)
        aggregationStage.push({ $match: { $text: { $search: q } } })

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

    for (let i = 0; i < aggregationStage.length; i++) {
        console.log(aggregationStage[i])
    }

    const articles = await articleModel.aggregate(aggregationStage)

    return res.json(articles)
}

module.exports = searchHandler
