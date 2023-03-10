const express = require('express')
const router = express.Router()

const withAuth = require('../../middlewares/withAuth')
const withRoot = require('@/middlewares/withRoot')

const {
    requestPasswordReset,
    processPasswordReset,
} = require('@/routes/user/forgotPassword')

router.use('/admin', withAuth, withRoot, require('./admin'))
router.get('/verify', require('./verify'))
router.get('/article', withAuth, require('./getSavedArticles'))
router.post('/article', withAuth, require('./saveArticle'))
router.delete('/article', withAuth, require('./removeSavedArticle'))
router.get('/topuser', withAuth, require('./topUser'))
router.get('/forgotpassword', requestPasswordReset)
router.post('/forgotpassword', processPasswordReset)

module.exports = router
