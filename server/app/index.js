const app = require('./app')
const path = require('path')

require('dotenv').config({ path: path.resolve(__dirname, '.env') })

// Connect to the database
require('../db')()

const server = require('http').createServer(app)

module.exports = { app, server }
