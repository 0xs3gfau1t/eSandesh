const express = require('express')
const articleModel = require('../../model/article')
const fs = require('fs')
const path = require('path')

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @return {void}
 */
const ARTICLE_AUDIO_FOLDER = path.resolve(
    __dirname,
    '../../assets/article/audio/'
)
const delArticle = async (req, res) => {
    const { id } = req.query

    const { user } = req.session

    const filter = { _id: id }

    // If the user is not admin then
    // they can't delete others article
    if (user.provider != 'admin') filter.createdBy = user.id

    try {
        const article = await articleModel.findOneAndDelete(filter)
        console.log('Deleting article audio: ', article?.audio)

        if (article.audio)
            fs.unlinkSync(ARTICLE_AUDIO_FOLDER + '/' + article.audio)

        return res.status(200).json(article)
    } catch (err) {
        console.error(err)
        return res.status(500).json({ error: 'Something went wrong.' })
    }
}

module.exports = delArticle
