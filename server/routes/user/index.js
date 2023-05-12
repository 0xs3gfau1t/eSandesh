const express = require('express')
const router = express.Router()

const withAuth = require('../../middlewares/withAuth')
const withRoot = require('@/middlewares/withRoot')

const adminRouter = require('./admin')
const getSavedArticles = require('./getSavedArticles')
const saveArticle = require('./saveArticle')
const removeArticle = require('./removeSavedArticle')
const topUser = require('./topUser')
const {
    requestPasswordReset,
    processPasswordReset,
} = require('@/routes/user/forgotPassword')
const { getImage, postImage } = require('@/routes/user/image')
const updateInfo = require('./updateInfo')
const getInfo = require('./getInfo')

router.post('/', withAuth, updateInfo)
router.get('/', getInfo)
router.use('/admin', withAuth, withRoot, adminRouter)
router.get('/verify', require('./verify'))
router.get('/article', withAuth, getSavedArticles)
router.post('/article', withAuth, saveArticle)
router.delete('/article', withAuth, removeArticle)
router.get('/topuser', withAuth, topUser)
router.get('/forgotpassword', requestPasswordReset)
router.post('/forgotpassword', processPasswordReset)

router.get('/image', getImage)
router.post('/image', withAuth, postImage)

module.exports = router
