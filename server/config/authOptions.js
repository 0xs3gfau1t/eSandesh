const { MongooseAdapter, sanitize } = require('../controllers/adapter')
const { userModel } = require('../model/user')
const { hashSync, compareSync } = require('bcryptjs')

const CredentialsProvider = require('next-auth/providers/credentials').default
const GoogleProvider = require('next-auth/providers/google').default

const getAuthOptions = res => {
    return {
        adapter: MongooseAdapter(),
        providers: [
            GoogleProvider({
                clientId: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            }),
            CredentialsProvider({
                id: 'register-user',
                name: 'Register',
                credentials: {
                    name: {
                        label: 'Username',
                        type: 'text',
                        placeholder: 'Your username',
                    },
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
                    try {
                        const hashedPassword = hashSync(creds.password, 10)
                        const user = new userModel({
                            name: creds.name,
                            email: creds.email,
                            password: hashedPassword,
                        })
                        if (!user) return null
                        await user.save()
                        return sanitize(user._doc)
                    } catch (err) {
                        console.error(err)
                        return null
                    }
                },
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
                    try {
                        const user = await userModel.findOne({
                            email: creds.email,
                        })
                        if (
                            !user ||
                            !user?.password ||
                            !compareSync(creds.password, user?.password)
                        )
                            return null
                        return sanitize(user._doc)
                    } catch (err) {
                        console.error(err)
                        return null
                    }
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
                    try {
                        const user = await userModel.findOne({
                            email: creds.email,
                            $or: [
                                { 'roles.isRoot': true },
                                { 'roles.canPublish': true },
                                { 'roles.isReporter': true },
                            ],
                        })
                        if (
                            !user ||
                            !user?.password ||
                            !compareSync(creds.password, user?.password)
                        )
                            return null
                        return sanitize(user._doc)
                    } catch (err) {
                        console.error(err)
                        return null
                    }
                },
            }),
        ],
        callbacks: {
            jwt: async ({ token, user, account, profile, isNewUser }) => {
                if (account)
                    token.provider =
                        account.provider == 'register-user'
                            ? 'user'
                            : account.provider
                if (user) {
                    res.cookie(
                        'user',
                        JSON.stringify({ history: user.history }),
                        {
                            httpOnly: true,
                            sameSite: 'lax',
                        }
                    )

                    token.id = user.id
                    token.roles = user.roles
                }
                return token
            },
            session: async ({ session, user, token }) => {
                session.user.provider = token.provider
                session.user.id = token.id
                session.user.roles = token.roles
                return session
            },
            redirect: async ({ url, baseUrl }) => {
                // Allows relative callback URLs
                if (url.startsWith('/')) return `${baseUrl}${url}`
                // Allows callback URLs on all other origin
                return url
            },
        },
        session: {
            strategy: 'jwt',
        },
        theme: {
            colorScheme: 'dark',
        },
        debug: process.env.NODE_ENV == 'development',
    }
}

module.exports = { getAuthOptions }
