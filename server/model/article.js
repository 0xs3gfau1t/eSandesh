const mongoose = require('mongoose')

const articleSchema = mongoose.Schema(
    {
        id: { type: String },
        title: { type: String },
        content: { type: String },
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        hits: { type: Number, default: 0 },
        comments: { type: [mongoose.Schema.Types.ObjectId], ref: 'Comment' },
        publishedAt: { type: Date },
        category: { type: [String] },
        tags: { type: [String] },
    },
    { timestamps: true }
)

module.exports = mongoose.model('Article', articleSchema)
