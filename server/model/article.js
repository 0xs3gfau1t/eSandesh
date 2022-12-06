const mongoose = require('mongoose')

const articleSchema = mongoose.Schema({
    id: { type: String },
    title: { type: String },
    content: { type: String },
    createdAt: { type: Date },
    modifiedAt: { type: Date },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    hits: { type: String },
    comments: { type: [mongoose.Schema.Types.ObjectId], ref: 'Comment' },
    publishedAt: { type: Date },
    category: { type: [String] },
    tags: { type: [String] },
})

module.exports = mongoose.model('Article', articleSchema)
