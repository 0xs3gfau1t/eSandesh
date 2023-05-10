const express = require('express')
const { userModel } = require('../model/user')

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
const fetchHistory = async (req, res, next) => {
    // if user is not logged in
    if (!req.session) {
        // if no cookie
        if (!req.cookies?.user) {
            req.cookies = { ...req.cookies, user: { history: {} } }
        } else {
            req.cookies.user = JSON.parse(req.cookies.user)
        }
    } else {
        // if user is logged in
        if (!req.cookies?.user) {
            // if no cookie
            const userMod = await userModel.findOne(
                { _id: req.session.user.id },
                { history: true }
            )

            req.cookies = {
                ...req.cookies,
                user: { history: userMod?.history || {} },
            }
        } else {
            req.cookies.user = JSON.parse(req.cookies.user)
        }
    }
    return next()
}

module.exports = fetchHistory
