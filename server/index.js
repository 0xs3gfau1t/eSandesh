const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '.env') })

// Connect to the database
require('./config/db')()

const { app, server } = require('./config/app')

////////////
// Routes //
////////////

app.use('/api/auth', require('./routes/auth'))

// Redirect everything other that /api/ to frontend
app.get('*', (_req, res) => {
	res.json({ response: 'it works' })
})

// Start the server specied in PORT from .env
let host = process.env.HOST || 'localhost'
let port = process.env.PORT || 4000

server.listen({ host, port }, () => {
	console.log(`\nBackend Server\nHost: ${host}\nPort: ${port}\n`)
})

module.exports = { app, server }
