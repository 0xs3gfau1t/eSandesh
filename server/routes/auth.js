const express = require('express')
const router = express.Router()

const NextAuth = require('next-auth').default

const { getAuthOptions } = require('../config/authOptions')

router.use(async (req, res, _next) => {
    if (req.url == '/') return res.send('Nothing here')

    // Capture all routes
    req.query.nextauth = req.url
        .slice(1)
        .replace(/\?.*/, '') // remove query part
        .split('/')

    if (req.query.nextauth[0] == 'signout') res.clearCookie('user')

    const authOptions = getAuthOptions(res)

    return NextAuth(req, res, authOptions)
})

module.exports = router
