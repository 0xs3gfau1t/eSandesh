const { userModel } = require('@/model/user')
const mongoose = require('mongoose')
const fs = require('fs')
const path = require('path')
const { JSDOM } = require('jsdom')

const transporter = require('@/controllers/mailer')

const sendNewsLetter = async ({ user, data }) => {
    try {
        const subscribers = await userModel.aggregate([
            {
                $match: {
                    subscriptions: mongoose.Types.ObjectId(user.id),
                },
            },
            {
                $project: {
                    email: true,
                    _id: false,
                },
            },
        ])
        const emails = subscribers.map(subscriber => subscriber.email)

        if (!emails.length) return { message: 'No subscribers to mail to' }

        const htmlFilePath = path.resolve(__dirname, '../assets/mail.html')
        const logoFilePath = path.resolve(__dirname, '../assets/logo.png')

        const content = new JSDOM(data.content).window.document.body.textContent
        const html = fs
            .readFileSync(htmlFilePath, 'utf8')
            .replace('{{POSTER}}', user.name)
            .replace(
                '{{URL}}',
                `${process.env.DOMAIN_URL}/${data.year}/${data.month}/${data.slug}`
            )
            .replace('{{TITLE}}', data.title)
            .replace(
                '{{CONTENT}}',
                content?.slice(0, 35) + (content?.length > 35 ? '...' : '')
            )
            .replace('{{DATE}}', new Date().toDateString())
            .replace('{{UNSUB_URL}}', `${process.env.DOMAIN_URL}/unsubscribe`)

        const resp = await transporter.sendMail({
            from: process.env.MAILER_ADD,
            to: emails,
            subject: `e-Sandesh: Newsletter Subscription`,
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

module.exports = sendNewsLetter
