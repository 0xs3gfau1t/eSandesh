const { redisClient } = require('@/config/redis')
const express = require('express')
const criticModel = require('../../model/critics')

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @return {void}
 */

module.exports = (req, res) => {
    const { criticId } = req.body

    criticModel.deleteOne({ _id: criticId }, async (e, d) => {
        if (e)
            return res
                .status(400)
                .json({ error: 'Invalid id received. None deleted' })

        res.json({ message: 'success' })

        redisClient
            .keys('/api/critics/list*')
            .then(keys => keys.forEach(key => redisClient.del(key)))
            .catch(e => console.error(e))
    })
}
