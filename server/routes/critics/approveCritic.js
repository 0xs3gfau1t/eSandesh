const critics = require('@/model/critics')
const express = require('express')
/**
    @param {express.Request} req
    @param {express.Response} res
    @return {express.Response}
*/

module.exports = (req, res) => {
    const { commentId } = req.body

    critics
        .updateOne({ commentId }, { publishedAt: new Date().toISOString() })
        .then(r => {
            res.json({ message: 'success' })
        })
        .catch(e => {
            console.error(e)
            res.status(500).json({ message: 'Something went wrong' })
        })
}
