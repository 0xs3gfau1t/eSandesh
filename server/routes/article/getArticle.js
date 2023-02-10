const express = require('express')
const updateHistory = require('../../controllers/updateHistory')
const articleModel = require('../../model/article')

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @return {void}
 */
const getArticle = async (req, res) => {
    const { year, month, slug } = req.params

    try {
        const article = await articleModel.aggregate([
            { $match: { year, month, slug } },
            {
                $lookup: {
                    from: 'users',
                    let: { id: '$createdBy' },
                    pipeline: [
                        { $match: { $expr: { $eq: ['$_id', '$$id'] } } },
                        { $project: { name: 1, _id: 0 } },
                    ],
                    as: 'author',
                },
            },
            { $unwind: { path: '$author' } },
        ])

        if (!article || article?.length == 0)
            return res.status(400).json({ message: 'Article not found.' })

        // Update category hits in user's history
        article[0]?.category.forEach(category => {
            // If the category doesnot exists then create
            if (!req.cookies.user.history.hasOwnProperty(category))
                req.cookies.user.history[category] = {
                    hits: 0,
                    likes: 0,
                    comments: 0,
                    watchtime: 0,
                }

            req.cookies.user.history[category].hits += 1
        })

        await updateHistory({ req, res })

        res.status(200).json(article[0])

        // Update article count in db
        await articleModel.updateOne({ year, month, slug }, { $inc: { hits: 1 } })
    } catch (err) {
        console.error(err)
        return res.status(500).json({ error: 'Something went wrong.' })
    }
}

module.exports = getArticle
