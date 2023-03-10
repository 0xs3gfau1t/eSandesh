const express = require('express')
const router = express.Router()

const withAuth = require('../../middlewares/withAuth')
const withRoot = require('@/middlewares/withRoot')
const fetchHistory = require('@/middlewares/fetchHistory')

const addAd = require('./addAd')
const delAd = require('./delAd')
const editAd = require('./editAd')
const getAd = require('./getAd')
const getAds = require('./getAds')
const listAds = require('./listAds')
const relevantAds = require('./relevantAds')
const getAdImage = require('./images')

router.get('/listbypublisher', withAuth, withRoot, getAds)
router.get('/list', withAuth, withRoot, listAds)
router.get('/relevant', fetchHistory, relevantAds)
router.get('/images/:id', getAdImage)
router.get('/', getAd)
router.post('/', withAuth, withRoot, addAd)
router.delete('/', withAuth, withRoot, delAd)
router.patch('/', withAuth, withRoot, editAd)

module.exports = router
