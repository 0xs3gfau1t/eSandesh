const router = require('express').Router()

const generateStats = require('./generate')

router.get('/', generateStats)

module.exports = router
