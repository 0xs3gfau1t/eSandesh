const mongoose = require('mongoose')

const articleSchema = mongoose.Schema(
    {
        title: { type: String },
        content: { type: String },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        hits: { type: Number, default: 0 },
        publishedAt: { type: Date },
        category: { type: [String] },
        tags: { type: [String] },
        priority: {
            type: Number,
            default: 5,
            validate: [
                priority => priority <= 10 && priority >= 0,
                'Invalid priority value. Expected between [0, 10]',
            ],
        },
        year: String,
        month: String,
        slug: String,
        summarizedContent: { type: String },
        audio: { type: Buffer },
        archived: { type: Boolean },
    },
    { timestamps: true }
)

module.exports = mongoose.model('Article', articleSchema)
