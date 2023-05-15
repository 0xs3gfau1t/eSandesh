const router = require('express').Router()

const withPublisher = require('@/middlewares/withPublisher')
const withAuth = require('@/middlewares/withAuth')

router.get('/', require('./listPolls'))
router.post('/', withAuth, require('./answerPoll'))
router.post('/add', withPublisher, require('./addPoll'))

module.exports = router
