const express = require('express')

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */

module.exports = (req, res) => {
    res.json({ message: 'hello getsubscriptions' })
}
