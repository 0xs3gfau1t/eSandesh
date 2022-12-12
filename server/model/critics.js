const mongoose = require('mongoose')

const criticSchema = mongoose.Schema(
    {
        article: {
            type: Object,
            of: new mongoose.Schema({
                year: { type: String, required: true },
                month: { type: String, required: true },
                slug: { type: String, required: true },
            }),
            required: true,
        },
        content: { type: String, required: true },
        name: { type: String, required: true },
        likes: { type: Number, default: 0 },
        commentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment' },
    },
    { timestamps: true }
)

module.exports = mongoose.model('Critics', criticSchema)
