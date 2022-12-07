const mongoose = require('mongoose')

const commentSchema = mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        content: { type: String },
        article: { type: mongoose.Schema.Types.ObjectId, ref: 'Article' },
        revisions: { type: [{ content: String, timestamp: Date }] },
        subComments: { type: [mongoose.Schema.Types.ObjectId], ref: 'Comment' },
        likes: { type: Number, default: 0 },
    },
    { timestamps: true }
)

module.exports = mongoose.model('Comment', commentSchema)
