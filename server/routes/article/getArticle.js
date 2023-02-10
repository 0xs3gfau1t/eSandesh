const express = require('express')
const articleModel = require('../../model/article')
const { userModel } = require('../../model/user')

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @return {void}
 */
const getArticle = async (req, res) => {
    const { year, month, slug } = req.params

    var article
    try {
        article = await articleModel.aggregate([
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

        if (!article)
            return res.status(400).json({ message: 'Article not found.' })

        // update cookies history
        var user = req.cookies?.user,
            userMod
        if (user) {
            // if previous cookie exists then parse it
            user = JSON.parse(user)
        } else {
            // if no previous cookie exists
            if (req.session) {
                // if the user is logged in fetch from db
                userMod = await userModel.findOne(
                    { _id: req.session.user.id },
                    { history: true }
                )
                user = { history: Object.fromEntries(userMod.history) }
            } else {
                // if not logged in create empty history
                user = { history: {} }
            }
        }

        // NOTE: if user is logged in then use database as source of truth for history and no need to update cookie
        // if not logged in then use cookie

        // set cookie
        res.cookie('user', JSON.stringify(user), {
            httpOnly: true,
            sameSite: 'lax',
        })

        res.status(200).json(article)
    } catch (err) {
        console.error(err)
        return res.status(500).json({ error: 'Something went wrong.' })
    }

    // Update article count
    await articleModel.updateOne({ year, month, slug }, { $inc: { hits: 1 } })

    // if user is logged in then update history counter in db as well
    if (req.session) {
        // if userModel has not been fetched
        if (!userMod)
            userMod = await userModel.findOne(
                { _id: req.session.user.id },
                { history: true }
            )

        // update category hits count
        article.category.forEach(category => {
            let val = userMod.history.get(category) || {
                hits: 0,
                likes: 0,
                comments: 0,
                watchtime: 0,
            }
            val.hits += 1
            userMod.history.set(category, val)
        })

        await userMod.save()
    }
}

module.exports = getArticle
