const articleModel = require('@/model/article')
const fs = require('fs')
const path = require('path')
const { JSDOM } = require('jsdom')
const { ObjectId } = require('mongodb')

const transporter = require('@/controllers/mailer')

const sendNewsLetter = async articleId => {
    try {
        const subscribers = await articleModel.aggregate([
            {
                $match: {
                    _id: new ObjectId(articleId),
                },
            },
            {
                $project: {
                    title: 1,
                    content: 1,
                    createdBy: 1,
                    year: 1,
                    month: 1,
                    slug: 1,
                    _id: 0,
                },
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'createdBy',
                    foreignField: '_id',
                    as: 'creator',
                    pipeline: [
                        {
                            $project: {
                                name: 1,
                            },
                        },
                    ],
                },
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'createdBy',
                    foreignField: 'subscriptions',
                    as: 'subscriber_emails',
                },
            },
            {
                $project: {
                    createdBy: false,
                },
            },
            {
                $unwind: {
                    path: '$creator',
                },
            },
            {
                $project: {
                    title: 1,
                    content: 1,
                    year: 1,
                    month: 1,
                    slug: 1,
                    'creator.name': 1,
                    'subscriber_emails.email': 1,
                },
            },
        ])

        const emails = subscribers[0].subscriber_emails.map(i => i.email)
        if (!emails?.length) return { message: 'No subscribers to mail to' }

        const htmlFilePath = path.resolve(__dirname, '../assets/mail.html')
        const logoFilePath = path.resolve(__dirname, '../assets/logo.png')

        const content = new JSDOM(subscribers[0].content).window.document.body
            .textContent
        const html = fs
            .readFileSync(htmlFilePath, 'utf8')
            .replace('{{POSTER}}', subscribers[0].creator.name)
            .replace(
                '{{URL}}',
                `${process.env.DOMAIN_URL}/${subscribers[0].year}/${subscribers[0].month}/${subscribers[0].slug}`
            )
            .replace('{{TITLE}}', subscribers[0].title)
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
