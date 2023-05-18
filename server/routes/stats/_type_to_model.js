const {
    userStatModel,
    articleStatModel,
    adsStatModel,
    commentStatModel,
    pollStatModel,
    metaModel,
} = require('@/model/stats')
const { default: mongoose } = require('mongoose')

/** @type {{[key: string]: mongoose.Model}} */
const typeToModelMap = {
    meta: metaModel,
    ads: adsStatModel,
    articles: articleStatModel,
    comments: commentStatModel,
    polls: pollStatModel,
    users: userStatModel,
}

module.exports = typeToModelMap
