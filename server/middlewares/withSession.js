const express = require('express')
const { getServerSession } = require('next-auth/next')
const { getAuthOptions } = require('../config/authOptions')

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
const withSession = async (req, res, next) => {
    const authOptions = getAuthOptions(res)
    const session = await getServerSession(req, res, authOptions)

    req.session = session
    return next()
}

module.exports = withSession
