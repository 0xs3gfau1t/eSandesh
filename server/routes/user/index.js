const express = require('express')
const router = express.Router()

const withAuth = require('../../middlewares/withAuth')

router.get('/article', withAuth, require('./getSavedArticles'))
router.post('/article', withAuth, require('./saveArticle'))
router.delete('/article', withAuth, require('./removeSavedArticle'))

module.exports = router
