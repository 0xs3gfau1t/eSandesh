const express = require('express')
const criticModel = require('../../model/critics')

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @return {void}
 */

// Top critics are those with high likes and subcomments
//
module.exports = (req, res) => {
    res.json({ message: 'hello' })
}
