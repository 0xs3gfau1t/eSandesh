const express = require('express')

/*
 * @param {express.Request} req
 * @param {express.Response} res
 */
const protected = (_req, res) => {
	return res.send('Secret')
}

module.exports = protected
