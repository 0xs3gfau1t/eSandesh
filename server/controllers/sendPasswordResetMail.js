const nodemailer = require('nodemailer')
const fs = require('fs')
const path = require('path')

const sendPasswordResetMail = async ({ email, url }) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.MAILER_HOST,
            port: process.env.MAILER_POST,
            secure: false,
            auth: {
                user: process.env.MAILER_ADD,
                pass: process.env.MAILER_PASS,
            },
        })
        const htmlFilePath = path.resolve(
            __dirname,
            '../assets/forgotPassword.html'
        )
        const logoFilePath = path.resolve(__dirname, '../assets/logo.png')

        const html = fs
            .readFileSync(htmlFilePath, 'utf8')
            .replace('{{URL}}', url)
            .replace('{{UNSUB_URL}}', `${process.env.DOMAIN_URL}/unsubscribe`)

        const resp = await transporter.sendMail({
            from: process.env.MAILER_ADD,
            to: email,
            subject: `e-Sandesh: Password Reset`,
            html,
            attachments: [
                {
                    filename: 'logo.png',
                    path: logoFilePath,
                    cid: 'logo',
                },
            ],
        })

        return {
            success: resp.accepted.length,
            failed: resp.rejected.length,
        }
    } catch (err) {
        console.error(err)
    }
}

module.exports = sendPasswordResetMail
