const express = require('express')

const { hashSync } = require('bcryptjs')
const path = require('path')
const fs = require('fs')

const { userModel } = require('@/model/user')

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @return {express.Response}
 */

module.exports = async (req, res) => {
    const transporter = await require('@/controllers/mailer')()
    if (!req.session?.user?.roles?.isRoot)
        return res.status(403).json({
            message: "You don't have enough privilege to perform this task.",
        })

    const { email, name, password, isRoot, canPublish, isReporter } = req.body
    const hashedPassword = hashSync(password, 10)
    const roles = { isRoot, canPublish, isReporter }

    try {
        const logoFilePath = path.resolve(__dirname, '../../../assets/logo.png')
        const htmlFilePath = path.resolve(
            __dirname,
            '../../../assets/simplemail.html'
        )

        const html = fs
            .readFileSync(htmlFilePath, 'utf8')
            .replace('{{TITLE}}', 'Be ready to change Nepal')
            .replace(
                '{{CONTENT}}',
                `Congratulations on becoming a member of eSandesh team.\nYour email has been used to register a moderator account in eSandesh. You can login to the portal using the following credentials.\nEmail: ${email}\nPassword: ${password}\nName: ${name}\nYour role is: ${
                    isRoot
                        ? 'Administrator'
                        : isReporter
                        ? 'Reporter'
                        : canPublish
                        ? 'Publisher'
                        : 'Normal User'
                }</br></br>`
            )
            .replace('{{DATE}}', new Date().toString())

        await userModel({
            email,
            password: hashedPassword,
            roles,
            name,
            emailVerified: new Date(),
        }).save()

        await transporter.sendMail({
            from: process.env.MAILER_ADD,
            to: email,
            subject: 'e-Sandesh: Welcome to eSandesh',
            html,
            attachments: [
                {
                    filename: 'logo.png',
                    path: logoFilePath,
                    cid: 'logo',
                },
            ],
        })

        res.json({ message: 'success' })
    } catch (e) {
        console.error(e)
        if (e.code === 11000 && e.title === 'MongoServerError')
            res.status(409).json({
                message: 'User with that credentials already exist.',
            })
        else res.status(500).json({ message: 'Something went wrong' })
    }
}
