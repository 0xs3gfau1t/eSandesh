const router = require('express').Router()

const generateStats = require('./generate')
const list = require('./list')
const downloadStats = require('./download')
const deleteStat = require('./delete')

router.get('/', list)
router.post('/', generateStats)
router.get('/download', downloadStats)
router.delete('/', deleteStat)

module.exports = router
