const express = require('express')
const router = express.Router()

router.use('/auth', require('./auth'))
router.use('/article', require('./article'))
router.use('/comment', require('./comment'))
router.use('/ads', require('./ads'))
router.use('/poll', require('./polls'))
router.use('/critics', require('./critics'))
router.use('/subscriptions', require('./subscriptions'))
router.use('/user', require('./user'))
router.use('/stats', require('./stats'))

router.get('*', (_req, res) => {
    res.status(404).json({ error: 'yamete kudasai!' })
})

module.exports = router
