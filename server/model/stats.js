const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId
const Schema = mongoose.Schema

const conn = mongoose.createConnection(process.env.MONGO_URI, {
    authSource: process.env.DB_AUTH_SOURCE,
    user: process.env.MONGO_USER,
    pass: process.env.MONGO_PASS,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: process.env.REPORTING_DB_NAME || 'reporting',
})

const user = new Schema({
    id: ObjectId,
    snapId: { type: ObjectId, ref: 'stat' },
    publishedAds: Number,
    createdArticles: Number,
    comments: Number,
    likedComments: Number,
    receivedLikes: Number,
    votedPolls: Number,
    subscribing: Number,
    subscriber: Number,
    savedArticles: Number,
})

const ads = new Schema({
    id: ObjectId,
    snapId: { type: ObjectId, ref: 'stat' },
    hits: Number,
})

const article = new Schema({
    id: ObjectId,
    snapId: { type: ObjectId, ref: 'stat' },
    hits: Number,
    saves: Number,
})

const comment = new Schema({
    id: ObjectId,
    snapId: { type: ObjectId, ref: 'stat' },
    likes: Number,
})

const poll = new Schema({
    id: ObjectId,
    snapId: { type: ObjectId, ref: 'stat' },
    votes: Number,
})

const category = new Schema({
    text: String,
    snapId: { type: ObjectId, ref: 'stat' },
    articles: Number,
    ads: Number,
})

const metadata = new Schema(
    {
        users: {
            type: new Schema(
                {
                    rootUsers: Number,
                    publisher: Number,
                    reporters: Number,
                    count: Number,
                },
                { _id: false }
            ),
        },
        ads: {
            type: new Schema({ count: Number, hits: Number }, { _id: false }),
        },
        articles: {
            type: new Schema(
                { count: Number, hits: Number, saves: Number },
                { _id: false }
            ),
        },
        comments: {
            type: new Schema({ count: Number, likes: Number }, { _id: false }),
        },
        polls: {
            type: new Schema({ count: Number, votes: Number }, { _id: false }),
        },
    },
    { timestamps: true }
)

const userStatModel = conn.model('user', user)
const adsStatModel = conn.model('ad', ads)
const articleStatModel = conn.model('article', article)
const commentStatModel = conn.model('comment', comment)
const pollStatModel = conn.model('poll', poll)
const categoryStatModel = conn.model('category', category)
const statModel = conn.model('stat', metadata)

module.exports = {
    userStatModel,
    adsStatModel,
    articleStatModel,
    commentStatModel,
    pollStatModel,
    categoryStatModel,
    statModel,
}
