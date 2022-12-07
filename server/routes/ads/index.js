const express = require('express')
const router = express.Router()

const withAuth = require('../../middlewares/withAuth')

const addAd = require('./addAd')
const delAd = require('./delAd')
const editAd = require('./editAd')
const getAd = require('./getAd')
const getAds = require('./getAds')

router.get('/', getAd)
router.get('/list', getAds)
router.post('/', withAuth, addAd)
router.delete('/', withAuth, delAd)
router.patch('/', withAuth, editAd)

module.exports = router
