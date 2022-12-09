const express = require('express')
const { unstable_getServerSession } = require('next-auth/next')
const { authOptions } = require('../config/authOptions')

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
const withSession = async (req, res, next) => {
    // Donot directly pass the authOptions
    // Doing so will reset the providers
    // Idk why but it does. Only way to fix
    // this for now is duplicate the object
    // and then pass it.

    const session = await unstable_getServerSession(req, res, {
        ...authOptions,
    })

    req.session = session
    return next()
}

module.exports = withSession