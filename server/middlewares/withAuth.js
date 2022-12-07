const express = require('express')
const { unstable_getServerSession } = require('next-auth')
const { authOptions } = require('../config/authOptions')

/*
 * @param {express.Request} req
 * @param {express.Response} res
 */
const withAuth = (req, res, next) => {
	const session = unstable_getServerSession(req, res, authOptions)
	console.log(session)
	next()
}

module.exports = withAuth
