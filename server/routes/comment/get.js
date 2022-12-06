const express = require('express')
/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @return {void}
 */
const getComments = (req, res) => {
    res.json({ message: 'GET /api/article/ works. Yayyy' })
}

module.exports = getComments
