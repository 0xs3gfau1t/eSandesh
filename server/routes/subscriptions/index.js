const express = require('express')
const router = express.Router()

const withAuth = require('@/middlewares/withAuth')

router.get('/', withAuth, require('./getSubscriptions'))
router.post('/', withAuth, require('./addSubscriptions'))
router.post('/poke', require('./sendNoti'))
router.delete('/', withAuth, require('./deleteSubscriptions'))

module.exports = router
