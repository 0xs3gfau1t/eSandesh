const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    const { id } = req.query
})

router.post('/', (req, res) => {
    const { id, content } = req.body
})

router.delete('/', (req, res) => {
    const { id } = req.query
})

router.patch('/', (req, res) => {
    const { id, content } = req.body
})

module.exports = router
