const { redisClient } = require('@/config/redis')

const getCache = async (key, callback) => {
    const cache = redisClient.get(key)
    if (cache) return JSON.parse(cache)

    const resp = await callback()
    try {
        redisClient.set(key, JSON.stringify(resp))
    } catch (err) {
        console.log('Response cannot be serialized.')
    }
    return resp
}

module.exports = getCache
