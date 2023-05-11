const express = require('express')
const criticModel = require('../../model/critics')

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @return {void}
 */

module.exports = async (req, res) => {
    return res.json({
        message: 'Cannot add critics manually. This service is terminated.',
    })
    const { name, content, year, month, slug, likes = 0, commentId } = req.body

    const articleIdentifier = { year, month, slug }

    try {
        const critic = new criticModel({
            name,
            content,
            article: articleIdentifier,
            likes,
            commentId,
        })
        await critic.save()

        res.json({ message: 'success', doc: critic })
    } catch (e) {
        console.error(e)
        res.status(400).json({
            error: 'Insufficient or invalid request payload',
        })
    }
}
