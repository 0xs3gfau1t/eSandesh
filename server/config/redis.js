const redis = require('redis')

const redisClient = redis.createClient({
    url: `redis://:${process.env.REDIS_PASSWORD || ''}@${
        process.env.REDIS_HOST || '127.0.0.1'
    }:${process.env.REDIS_PORT || 6379}`,
})

module.exports = { redisClient }
