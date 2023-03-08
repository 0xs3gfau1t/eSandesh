const express = require('express')
const router = express.Router()

const withAuth = require('../../middlewares/withAuth')
const withPublisher = require('../../middlewares/withPublisher')
// Need reporter here
const fetchHistory = require('../../middlewares/fetchHistory')

const addArticle = require('./addArticle')
const delArticle = require('./delArticle')
const editArticle = require('./editArticle')
const getArticle = require('./getArticle')
const listArticle = require('./listArticle')
const toPublish = require('./toPublish')
const publish = require('./publish')
const recite = require('./recite')
const userArticles = require('./userArticles')

router.get('/list*', fetchHistory, listArticle)
router.get('/:year/:month/:slug', fetchHistory, getArticle)
router.get('/recite', fetchHistory, recite)
router.get('/topublish', /*withPublisher*/ toPublish)
router.post('/publish', withPublisher, publish)
router.get('/byuser', userArticles)
router.post('/', withAuth, addArticle)
router.delete('/', withAuth, delArticle)
router.patch('/', withAuth, editArticle)

module.exports = router
