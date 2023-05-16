const router = require('express').Router()

const generateStats = require('./generate')

const list = require('./list')

router.post('/generate', generateStats)
router.get('/list', list)

module.exports = router
