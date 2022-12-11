const express = require('express')
const articleModel = require('../../model/article')

const socialApis = {
    facebook: require('./socials/facebook'),
}

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */

const addArticle = async (req, res) => {
    const {
        title,
        content,
        category = [],
        tags = [],
        priority,
        socials,
    } = req.body

    const { user } = req.session
    const data = { title, content, category, tags }

    // If the user is an admin then publish the article
    // also set the priority
    if (user.roles.isRoot) {
        data.publishedAt = new Date()
        data.priority = priority
    } else {
        data.createdBy = user.id
    }

    const providedSocialsToUpdateOn = socials
        .split(',')
        .map(i => i.trim())
        .filter(i => i !== '')

    try {
        const article = new articleModel(data)
        await article.save()

        providedSocialsToUpdateOn.forEach(social => {
            if (socialApis[social]) socialApis[social](title)
        })

        return res.status(200).json(article)
    } catch (err) {
        console.error(err)
        return res.status(500).json({ error: 'Something went wrong.' })
    }
}

module.exports = addArticle
