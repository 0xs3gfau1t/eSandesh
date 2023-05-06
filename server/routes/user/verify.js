const express = require('express')
const jwt = require('next-auth/jwt')
const fs = require('fs')
const path = require('path')

const { userModel } = require('@/model/user')
/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @return {express.Response}
 */

module.exports = async (req, res) => {
    const { key: token } = req.query
    const responseHtmlData = {
        title: '',
        content: '',
        date: new Date().toUTCString(),
    }
    try {
        const {
            email,
            hashedPassword: password,
            name,
            roles,
        } = await jwt.decode({
            token,
            secret: process.env.NEXTAUTH_SECRET,
        })

        // Create an entry in db
        try {
            await userModel({ email, password, roles, name }).save()
            responseHtmlData.title = 'Email Verified'
            responseHtmlData.content =
                'Your email has been successfully verified. You can now proceed to login.'
        } catch (e) {
            console.error(e)
            responseHtmlData.title = 'Invalid User'
            responseHtmlData.content =
                'User already exists or some information is still invalid/incomplete.'
        }
    } catch (e) {
        console.error(e)
        if (e.name === 'JWEInvalid') {
            responseHtmlData.title = 'Invalid User'
            responseHtmlData.content =
                'User already exists or some information is still invalid/incomplete.'
        } else if (e.name === 'JWTExpired') {
            responseHtmlData.title = 'Link Expired'
            responseHtmlData.content =
                'Verification link has expired.<br/>Please contact the administrator to request the link again.'
        } else {
            responseHtmlData.title = 'Server Error'
            responseHtmlData.content =
                'Something went wrong with the server. Please report to site administrator.'
        }
    } finally {
        res.send(
            fs
                .readFileSync(
                    path.resolve(__dirname, '../../assets/simplemail.html'),
                    'utf8'
                )
                .replace('{{TITLE}}', responseHtmlData.title)
                .replace('{{CONTENT}}', responseHtmlData.content)
                .replace('{{DATE}}', responseHtmlData.date)
        )
    }
}
