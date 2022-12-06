const express = require('express')
/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @return {void}
 */
const getComments = (req, res) => {
    const { articleId: id, page = 0 } = req.query
}

module.exports = getComments
