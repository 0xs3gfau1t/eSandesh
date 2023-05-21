const fs = require('fs')
const path = require('path')

const sendRegistartionMail = async ({ email, url }) => {
    const transporter = await require('@/controllers/mailer')()
    try {
        const htmlFilePath = path.resolve(__dirname, '../assets/register.html')
        const logoFilePath = path.resolve(__dirname, '../assets/logo.png')

        const html = fs
            .readFileSync(htmlFilePath, 'utf8')
            .replace('{{URL}}', url)
            .replace('{{UNSUB_URL}}', `${process.env.DOMAIN_URL}/unsubscribe`)

        const resp = await transporter.sendMail({
            from: process.env.MAILER_ADD,
            to: email,
            subject: `e-Sandesh: User Registration`,
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
        throw err // ik i'm doing this
    }
}

module.exports = sendRegistartionMail
