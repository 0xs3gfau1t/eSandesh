const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String, unique: true },
    emailVerified: { type: Date },
    password: { type: String },
    image: { type: String },
    imageBuffer: { type: Buffer },
    // articles: { type: [mongoose.Schema.Types.ObjectId], ref: 'Article' },
    roles: {
        isRoot: { type: Boolean },
        canPublish: { type: Boolean },
        isReporter: { type: Boolean },
    },
    history: {
        type: Map,
        of: new mongoose.Schema(
            {
                hits: Number,
                likes: Number,
                comments: Number,
                watchtime: Number,
            },
            { _id: false }
        ),
        default: {},
    },
    subscriptions: { type: [mongoose.Schema.Types.ObjectId], ref: 'User' },
    saved: {
        type: [mongoose.Schema.Types.ObjectId],
    },
})

const accountSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    type: { type: String },
    provider: { type: String },
    providerAccountId: { type: String },
    refresh_token: { type: String },
    access_token: { type: String },
    expires_at: { type: Number },
    token_type: { type: String },
    scope: { type: String },
    id_token: { type: String },
    oauth_token_secret: { type: String },
    oauth_token: { type: String },
    session_state: { type: String },
})

const userModel = mongoose.model('User', userSchema)
const accountModel = mongoose.model('Account', accountSchema)

module.exports = { userModel, accountModel }
