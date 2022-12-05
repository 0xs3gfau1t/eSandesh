const CredentialsProvider = require('next-auth/providers/credentials').default
const GithubProvider = require('next-auth/providers/github').default
const GoogleProvider = require('next-auth/providers/google').default

const authOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        CredentialsProvider({
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
