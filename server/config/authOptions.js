const MongooseAdapter = require('../controllers/adapter')

const CredentialsProvider = require('next-auth/providers/credentials').default
const FacebookProvider = require('next-auth/providers/facebook').default

const authOptions = {
    adapter: MongooseAdapter(),
    providers: [
        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        }),
        CredentialsProvider({
            id: 'user',
            name: 'Credentials',
            credentials: {
                email: {
                    label: 'Email',
                    type: 'email',
                    placeholder: 'Your email address',
                },
                password: {
                    label: 'Password',
                    type: 'password',
                    placeholder: 'Your password',
                },
            },
            async authorize(creds, _req) {
                console.log(creds)
                // check in mongo database and return user details
                return { id: 1, name: 'Bijan Regmi', password: 'HEHE' }
            },
        }),
        CredentialsProvider({
            id: 'admin',
            name: 'Admin',
            credentials: {
                username: {
                    label: 'Username',
                    type: 'text',
                    placeholder: 'Your username',
                },
                password: {
                    label: 'Password',
                    type: 'password',
                    placeholder: 'Your password',
                },
            },
            async authorize(creds, _req) {
                console.log(creds)
                if (
                    creds.username == process.env.ADMIN_USER &&
                    creds.password == process.env.ADMIN_PASS
                )
                    return {
                        id: 1,
                        name: creds.username,
                        password: creds.password,
                    }
                return null
            },
        }),
    ],
    callbacks: {
        jwt: async ({ token, user, account, profile, isNewUser }) => {
            if (account) token.provider = account.provider
            if (user) token.id = user.id
            return token
        },
        session: async ({ session, user, token }) => {
            session.user.provider = token.provider
            session.user.id = token.id
            return session
        },
    },
    session: {
        strategy: 'jwt',
    },
    debug: true,
}

module.exports = { authOptions }
