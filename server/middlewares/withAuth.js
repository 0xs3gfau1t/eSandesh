const express = require('express')

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
const withAuth = async (req, res, next) => {
    if (req.session) return next()

    return res.status(401).json({ error: 'Unauthorized' })
}

module.exports = withAuth
