const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
// Logger
app.use(function (req, _res, next) {
    console.log(`-> ${req.url}\n`)
    next()
})

// Url and body parsing
app.use(express.json({ limit: '10mb' }))
app.use(
    express.urlencoded({
        extended: true,
    })
)
app.use(require('cookie-parser')())

const server = require('http').createServer(app)

module.exports = { app, server }
