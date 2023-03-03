const express = require('express')
const { getServerSession } = require('next-auth/next')
const { authOptions } = require('../config/authOptions')

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
const withSession = async (req, res, next) => {
    const session = await getServerSession(req, res, authOptions)

    req.session = session
    return next()
}

module.exports = withSession
