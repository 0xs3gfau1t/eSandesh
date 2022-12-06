const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    timeStamp: { type: Date },
    content: { String },
    articleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Article' },
    revisions: { type: [mongoose.Schema.Types.ObjectId], ref: 'Comment' },
    subComments: { type: [mongoose.Schema.Types.ObjectId], ref: 'Comment' },
    likes: { type: Number },
})

module.exports = mongoose.model('Comment', commentSchema)
