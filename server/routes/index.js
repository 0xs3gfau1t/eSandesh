const express = require('express')
const withAuth = require('../middlewares/withAuth')
const router = express.Router()

router.use('/auth', require('./auth'))
router.use('/article', require('./article'))
router.use('/comment', require('./comment'))
router.use('/ads', require('./ads'))

router.get('*', (_req, res) => {
    res.json({ message: 'yamete kudasai!' })
})

module.exports = router
