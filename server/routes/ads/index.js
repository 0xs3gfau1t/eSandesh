const express = require('express')
const router = express.Router()

const withAuth = require('../../middlewares/withAuth')

const addAd = require('./addAd')
const delAd = require('./delAd')
const editAd = require('./editAd')
const getAd = require('./getAd')
const getAds = require('./getAds')
const listAds = require('./listAds')

router.get('/listbypublisher', withAuth, getAds)
router.get('/list', listAds)
router.get('/', withAuth, getAd)
router.post('/', withAuth, addAd)
router.delete('/', withAuth, delAd)
router.patch('/', withAuth, editAd)

module.exports = router
