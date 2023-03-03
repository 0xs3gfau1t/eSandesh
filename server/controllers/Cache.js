const { redisClient } = require('@/config/redis')

/**
 * @template T
 * @param {string} key
 * @param {T} callback
 * @param {import('redis').SetOptions} opts
 *
 * @returns {Promise<ReturnType<T>>}
 */
const Cache = async (key, callback, opts) => {
    if (process.env.__DISABLE_CACHE == 'true') {
        console.log(`[!] Not caching key: ${key} since caching is disabled.`)
        return await callback()
    }

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
        redisClient.set(key, JSON.stringify(resp), opts).catch(err => {
            console.log('[!] Failed to save response in redis server!')
            console.error(err)
        })
        return resp
    } catch (err) {
        throw err
    }
}

module.exports = Cache
