const express = require('express')
const router = express.Router()

const withAuth = require('../../middlewares/withAuth')

const addComment = require('./addComment')
const delComment = require('./delComment')
const editComment = require('./editComment')
const getComments = require('./getComments')
const likeComment = require('./likeComment')

router.get('/', getComments)
router.post('/', withAuth, addComment)
router.post('/like', withAuth, likeComment)
router.delete('/', withAuth, delComment)
router.patch('/', withAuth, editComment)

module.exports = router
