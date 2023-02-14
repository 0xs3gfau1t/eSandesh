const { redisClient } = require('@/config/redis')

const Cache = async (key, callback) => {
    try {
        const value = await redisClient.get(key)
        if (value) {
            console.debug('[+] CacheHit for key:', key)
            return JSON.parse(value)
        }
    } catch (err) {
        console.error('[!] Failed communicating with redis server!')
        console.error(err)
    }

    try {
        const resp = await callback()
        redisClient.set(key, JSON.stringify(resp)).catch(err => {
            console.log('[!] Failed to save response in redis server!')
            console.error(err)
        })
        return resp
    } catch (err) {
        throw err
    }
}

module.exports = Cache
