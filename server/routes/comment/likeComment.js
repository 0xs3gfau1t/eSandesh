const express = require('express')
const commentModel = require('../../model/comment')
const articleModel = require('../../model/article')
const { userModel } = require('../../model/user')
/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @return {void}
 */

//
//
// Preferance likes are not reduced even if the user disliked the comment
// Because.
// Even if user dislikes particular comment, their preferance is still on this category
// over other, that gives like factor a truthy value
//
// Also it's an excuse for some additional logic cause I'm exhausted
// And its almost 12AM ;)
//

module.exports = (req, res) => {
    const { id } = req.body

    commentModel.findOne({ _id: id }, async (e, d) => {
        if (!d) return res.status(404).json({ error: 'No such comment found' })

        const index = d.likes.indexOf(req.session.user.id)

        if (index > -1) d.likes.splice(index, 1)
        else d.likes.push(req.session.user.id)

        // Update user preference for this category
        const userCookie = req.cookies?.user

        let parsedCookies
        if (userCookie) parsedCookies = JSON.parse(userCookie)

        const parentArticleCategories = await articleModel.findOne(
            {
                _id: d.article,
            },
            { category: true }
        )

        parentArticleCategories.category.forEach(category => {
            if (parsedCookies[category]) parsedCookies[category].likes += 1
            else {
                parsedCookies[category] = {
                    hits: 1,
                    likes: 1,
                    comments: 0,
                    watchtime: 0,
                }
            }
        })

        res.cookie('user', JSON.stringify(parsedCookies), {
            httpOnly: true,
            sameSite: 'lax',
        })
        d.save()
        res.json({ message: 'success' })

        // Update preferance in db as well
        const user = await userModel.findOne(
            { _id: req.session.user.id },
            { history: true }
        )

        if (!user) return

        parentArticleCategories.category.forEach(category => {
            if (user.history.get(category))
                user.history.get(category).likes =
                    user.history.get(category).likes + 1
            else
                user.history.set(category, {
                    hits: 1,
                    likes: 1,
                    comments: 0,
                    watchtime: 0,
                })
        })
        user.save()
    })
}
