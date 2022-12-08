const MongooseAdapter = require('../controllers/adapter')
const { userModel } = require('../model/user')

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
                const user = new userModel({
                    name: creds.name,
                    email: creds.email,
                    password: creds.password,
                })
                console.log(user)
                await user.save()
                return user ? user.toObject() : null
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
                const user = await userModel.findOne({
                    email: creds.email,
                    password: creds.password,
                })
                return user ? user.toObject() : null
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
                try {
                    const user = await userModel.findOne({
                        email: creds.username,
                        password: creds.password,
                        'roles.isRoot': true,
                    })
                    console.log(user)
                    if (!user) return null
                    return user.toObject()
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
                token.id = user._id
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
    },
    session: {
        strategy: 'jwt',
    },
    debug: true,
}

module.exports = { authOptions }
