const nodemailer = require('nodemailer')
const { google } = require('googleapis')

const REDIRECT_URI = 'https://developers.google.com/oauthplayground'

const OAuth2Client = new google.auth.OAuth2(
    process.env.MAILER_CLIENT_ID,
    process.env.MAILER_CLIENT_SECRET,
    REDIRECT_URI
)
OAuth2Client.setCredentials({ refresh_token: process.env.MAILER_REFRESH_TOKEN })

module.exports = async () => {
    const accessToken = await OAuth2Client.getAccessToken()

    return nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: process.env.MAILER_USER,
            clientId: process.env.MAILER_CLIENT_ID,
            clientSecret: process.env.MAILER_CLIENT_SECRET,
            accessToken: accessToken,
            refreshToken: process.env.MAILER_REFRESH_TOKEN,
        },
        secure: false,
    })
}
