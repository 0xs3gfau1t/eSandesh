const express = require('express')
const router = express.Router()

const withAuth = require('../../middlewares/withAuth')
const withRoot = require('@/middlewares/withRoot')
const withHistory = require('@/middlewares/fetchHistory')

const adminRouter = require('./admin')
const getSavedArticles = require('./getSavedArticles')
const saveArticle = require('./saveArticle')
const removeArticle = require('./removeSavedArticle')
const topUser = require('./topUser')
const {
    requestPasswordReset,
    processPasswordReset,
} = require('@/routes/user/forgotPassword')
const { getImage, postImage, deleteImage } = require('@/routes/user/image')
const updateInfo = require('./updateInfo')
const getInfo = require('./getInfo')
const { getRashifal, setRashifal } = require('./rashifal')
const getRelevantCategories = require('./relevantCategories')

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
router.get('/relevantCategories', withHistory, getRelevantCategories)

router.get('/rashifal', withAuth, getRashifal)
router.post('/rashifal', withAuth, setRashifal)

router.get('/image', getImage)
router.post('/image', withAuth, postImage)
router.delete('/image', withAuth, deleteImage)

module.exports = router
