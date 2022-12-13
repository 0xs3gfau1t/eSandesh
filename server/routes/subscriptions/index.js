const express = require('express')
const router = express.Router()

router.get('/', require('./getSubscriptions'))
router.post('/', require('./addSubscriptions'))
router.post('/poke', require('./sendNoti'))
router.delete('/', require('./deleteSubscriptions'))

module.exports = router
