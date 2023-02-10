const mongoose = require('mongoose')

let cached = global.db

if (!cached) cached = global.db = { conn: null, promise: null }

async function dbConnect() {
    // If cached connection already exsists return that
    if (cached.conn) return global.db

    // If connection has not been initiated
    if (!cached.promise) {
        // If connecting to mongoatlas remove authSource, user and pass options
        cached.promise = mongoose.connect(process.env.MONGO_URI, {
            authSource: process.env.DB_AUTH_SOURCE,
            user: process.env.MONGO_USER,
            pass: process.env.MONGO_PASS,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: process.env.DB_NAME,
        })
    }

    // After connection has been initiated await for it
    try {
        cached.conn = await cached.promise
        console.log('Connected to the database.\n')
    } catch (err) {
        console.error('Error while connecting to the database.\n')
        console.error(err)
    }
}

module.exports = dbConnect
