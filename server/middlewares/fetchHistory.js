const express = require('express')
const { userModel } = require('../model/user')

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
const fetchHistory = async (req, res, next) => {
    // if user is not logged in
    if (!req.session) {
        // if no cookie, set the cookie in response as well
        if (!req.cookies?.user) {
            const newUserCookie = { history: {} }
            req.cookies = { ...req.cookies, user: newUserCookie }
            res.cookie('user', JSON.stringify(newUserCookie))
        } else {
            req.cookies.user = JSON.parse(req.cookies.user)
        }
    } else {
        // if user is logged in
        if (!req.cookies?.user) {
            // if no cookie, set the cookie in response as well
            const userMod = await userModel.findOne(
                { _id: req.session.user.id },
                { history: true }
            )

            const newUserCookie = { history: userMod?.history || {} }

            req.cookies = {
                ...req.cookies,
                user: { history: userMod?.history || {} },
            }
            res.cookie('user', JSON.stringify(newUserCookie))
        } else {
            req.cookies.user = JSON.parse(req.cookies.user)
        }
    }
    return next()
}

module.exports = fetchHistory
