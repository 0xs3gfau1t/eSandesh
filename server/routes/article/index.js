const express = require('express')
const router = express.Router()

const withAuth = require('../../middlewares/withAuth')
const withPublisher = require('../../middlewares/withPublisher')
const fetchHistory = require('../../middlewares/fetchHistory')

const addArticle = require('./addArticle')
const delArticle = require('./delArticle')
const editArticle = require('./editArticle')
const getArticle = require('./getArticle')
const listArticle = require('./listArticle')
const toPublish = require('./toPublish')
const publish = require('./publish')
const recite = require('./recite')
const { userArticles, getContent } = require('./userArticles')
const search = require('./search')
const archive = require('./archive')
const convertToArchive = require('./convertToArchive')
const summary = require('./summary')

router.get('/list*', fetchHistory, listArticle)
router.get('/:year/:month/:slug', fetchHistory, getArticle)
router.get('/recite', recite)
router.get('/topublish', withPublisher, toPublish)
router.post('/publish', withPublisher, publish)
router.get('/byuser', userArticles)
router.get('/search', search)
router.get('/archive', archive)
router.post('/archive', convertToArchive)
router.get('/summary', summary)
router.get('/content', getContent)
router.post('/', withAuth, addArticle)
router.delete('/', withAuth, delArticle)
router.patch('/', withAuth, editArticle)

module.exports = router
