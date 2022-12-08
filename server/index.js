const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '.env') })

// Connect to the database
require('./config/db')()

const { app, server } = require('./config/app')

////////////
// Routes //
////////////

app.use('/api', require('./middlewares/withSession'), require('./routes'))

// Redirect everything other that /api/ to frontend
app.all('*', (_req, res) => {
    return res.json({ response: 'What are you doing onii-chaan?' })
})

// Start the server specied in PORT from .env
let host = process.env.HOST || 'localhost'
let port = process.env.PORT || 4000

server.listen({ host, port }, () => {
    console.log(`\nBackend Server\nHost: ${host}\nPort: ${port}\n`)
})

module.exports = { app, server }
