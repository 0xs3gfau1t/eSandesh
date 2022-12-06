const express = require('express')
const router = express.Router()

router.get('/', require('./get'))
router.post('/', require('./post'))
router.delete('/', require('./delete'))
router.patch('/', require('./patch'))

module.exports = router
