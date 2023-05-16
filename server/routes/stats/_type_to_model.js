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
    article: articleStatModel,
    comment: commentStatModel,
    poll: pollStatModel,
    user: userStatModel,
}

module.exports = typeToModelMap
