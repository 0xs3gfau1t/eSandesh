const express = require('express')
const router = express.Router()

const addArticle = require('./addArticle')
const delArticle = require('./delArticle')
const editArticle = require('./editArticle')
const getArticle = require('./getArticle')
const listArticle = require('./listArticle')

router.get('/', getArticle)
router.post('/', addArticle)
router.delete('/', delArticle)
router.patch('/', editArticle)

router.get('/list/', listArticle)

module.exports = router
