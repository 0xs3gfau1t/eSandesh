const express = require('express')
const fs = require('fs')
const path = require('path')
const sanitize = require('sanitize-filename')

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @return {void}
 */

module.exports = async (req, res) => {
    fs.readFile(
        path.resolve(
            __dirname,
            '../../assets/ads/images/' + sanitize(req.params.id)
        ),
        (err, data) => {
            if (err) res.status(404)
            res.send(data)
        }
    )
}
