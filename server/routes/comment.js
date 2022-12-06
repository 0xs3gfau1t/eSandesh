const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    const { articleId: id, page = 0 } = req.query
})

router.post('/', (req, res) => {
    const { articleId: id, content } = req.body
})

router.delete('/', (req, res) => {
    const { id } = req.query
})

router.patch('/', (req, res) => {
    const { id, content } = req.body
})

module.exports = router
