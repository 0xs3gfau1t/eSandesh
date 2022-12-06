const express = require('express')
/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @return {void}
 */
const addComment = (req, res) => {
    const { articleId: id, content } = req.body
}

module.exports = addComment
