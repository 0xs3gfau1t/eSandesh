require('module-alias/register')
const path = require('path')
const express = require('express')
require('dotenv').config({ path: path.resolve(__dirname, '.env') })

const { redisClient } = require('@/config/redis')

// Connect to the database
require('@/config/db')()
redisClient
    .connect()
    .then(() => console.log('Connected to redis server'))
    .catch(console.error)

const { app, server } = require('./config/app')

////////////
// Routes //
////////////

app.use('/api', require('./middlewares/withSession'), require('./routes'))

// Redirect everything other that /api/ to frontend
if (process.env.NODE_ENV === 'production')
    app.use(express.static(path.resolve(__dirname, './dist')))

app.all('*', (_req, res) => {
    if (process.env.NODE_ENV === 'production')
        return res.sendFile(path.resolve(__dirname, './dist/index.html'))
    return res.status(404).json({ response: 'What are you doing onii-chaan?' })
})

// Start the server specied in PORT from .env
let host = process.env.HOST || 'localhost'
let port = process.env.PORT || 4000

server.listen({ host, port }, () => {
    console.log(`\nBackend Server\nHost: ${host}\nPort: ${port}\n`)
})

module.exports = { app, server }
