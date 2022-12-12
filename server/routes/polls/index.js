const express = require('express')
const router = express.Router()

const withAuth = require('../../middlewares/withAuth')

const addPoll = require('./addPoll')

router.post('/add', addPoll)
router.get('/list', require('./listPoll'))
router.post('/answer', withAuth, require('./answerPoll'))

module.exports = router
