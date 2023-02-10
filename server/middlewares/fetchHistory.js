const express = require('express')
const { userModel } = require('../model/user')

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
const fetchHistory = async (req, res, next) => {
    console.log('Calling fetchHistory')
    // if user is not logged in
    if (!req.session) {
        console.log('not loged in')
        // if no cookie
        if (!req.cookies?.user) {
            console.log('no cookie')
            req.cookies = { ...req.cookies, user: { history: {} } }
        } else {
            req.cookies.user = JSON.parse(req.cookies.user)
        }
    } else {
        // if user is logged in
        console.log('logged in')
        if (!req.cookies?.user) {
            console.log('no cookie')
            // if no cookie
            const userMod = await userModel.findOne(
                { id: req.session.user.id },
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
    console.log('Cookies: ')
    console.log(req.cookies)
    return next()
}

module.exports = fetchHistory
