const mongoose = require('mongoose')

const commentSchema = mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        content: { type: String },
        article: { type: mongoose.Schema.Types.ObjectId, ref: 'Article' },
        parentComment: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment' },
        revisions: { type: [{ content: String, timestamp: Date }] },
        likes: { type: [mongoose.Schema.Types.ObjectId], ref: 'User' },
    },
    { timestamps: true }
)

const commentModel = mongoose.model('Comment', commentSchema)

module.exports = commentModel
