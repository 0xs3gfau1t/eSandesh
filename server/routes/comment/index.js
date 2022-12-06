const express = require('express')
const router = express.Router()

const addComment = require('./addComment')
const delComment = require('./delComment')
const editComment = require('./editComment')
const getComments = require('./getComments')

router.get('/', getComments)
router.post('/', addComment)
router.delete('/', delComment)
router.patch('/', editComment)

module.exports = router
