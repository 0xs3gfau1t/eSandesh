const express = require('express')
const cors = require('cors')
const app = express()
const fileUpload = require('express-fileupload')
app.use(cors())
// Logger
app.use(function (req, _res, next) {
    console.log(`-> ${req.url}\n`)
    next()
})
app.use(fileUpload())

// Url and body parsing
app.use(express.json({ limit: '2mb' }))
app.use(
    express.urlencoded({
        extended: true,
        limit: '2mb',
    })
)
app.use(require('cookie-parser')())

const server = require('http').createServer(app)

module.exports = { app, server }
