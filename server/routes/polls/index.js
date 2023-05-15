const router = require('express').Router()

const withPublisher = require('@/middlewares/withPublisher')
const withAuth = require('@/middlewares/withAuth')

router.post('/add', withPublisher, require('./addPoll'))
router.get('/list', require('./listPolls'))
router.get('/', withAuth, require('./getPoll'))
router.post('/answer', withAuth, require('./answerPoll'))

module.exports = router
