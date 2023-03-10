const express = require('express')
const transporter = require('@/controllers/mailer')

const { hashSync } = require('bcryptjs')
const path = require('path')
const fs = require('fs')

const jwt = require('next-auth/jwt')

const EXPIRE_MIN = 5

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @return {express.Response}
 */

module.exports = async (req, res) => {
    const { email, name, password, isRoot, canPublish, isReporter } = req.body
    const hashedPassword = hashSync(password, 10)
    const roles = { isRoot, canPublish, isReporter }

    const key = await jwt.encode({
        token: { email, name, hashedPassword, roles },
        secret: process.env.NEXTAUTH_SECRET,
        maxAge: 60 * EXPIRE_MIN,
    })

    const logoFilePath = path.resolve(__dirname, '../../../assets/logo.png')
    const htmlFilePath = path.resolve(
        __dirname,
        '../../../assets/simplemail.html'
    )

    const html = fs
        .readFileSync(htmlFilePath, 'utf8')
        .replace('{{TITLE}}', 'Verify Your Email')
        .replace(
            '{{CONTENT}}',
            `Your email address has been used to register in e-Sandesh. <br/></br>Click on <strong><a href=\'${process.env.ORIGIN}/api/user/verify?key=${key}\'>link</a></strong>thisIf you don\'t know what\'s going on, please ignore and delete this email.`
        )
        .replace('{{DATE}}', new Date().toString())

    // Send Verification Email before adding to database
    await transporter.sendMail({
        from: process.env.MAILER_ADD,
        to: email,
        subject: 'e-Sandesh: Verify Email',
        html,
        attachments: [
            {
                filename: 'logo.png',
                path: logoFilePath,
                cid: 'logo',
            },
        ],
    })

    res.json({ message: 'Verification Email Sent' })
}
