const express = require('express')
const router = express.Router()

router.use('/auth', require('./auth'))
router.use('/article', require('./article'))
router.use('/comment', require('./comment'))
router.use('/ads', require('./ads'))
router.use('/poll', require('./polls'))
router.use('/critics', require('./critics'))
router.get('/topuser', require('./topUser'))
router.use('/subscriptions', require('./subscriptions'))
router.use('/chakre', require('./chakre'))
router.use('/user', require('./user'))

router.get('*', (_req, res) => {
    res.json({ message: 'yamete kudasai!' })
})

module.exports = router
