const express = require('express')
const router = express.Router()

const NextAuth = require('next-auth').default

const { authOptions } = require('../config/authOptions')

router.use(async (req, res, _next) => {
    if (req.url == '/') return res.send('Nothing here')

    req.query.nextauth = req.url
        .slice(1)
        .replace(/\?.*/, '') // remove query part
        .split('/')

    return NextAuth(req, res, authOptions)
})

module.exports = router
