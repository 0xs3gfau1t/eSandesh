const router = require('express').Router()

const generateStats = require('./generate')
const list = require('./list')
const deleteStats = require('./delete')
const deleteStat = require('./delete')

router.get('/', list)
router.post('/', generateStats)
router.delete('/', deleteStat)

module.exports = router
