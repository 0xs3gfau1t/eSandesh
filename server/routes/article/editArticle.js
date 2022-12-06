const express = require('express')
/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @return {void}
 */
const editArticle = (req, res) => {
    const { id, content } = req.body
}

module.exports = editArticle
