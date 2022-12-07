const mongoose = require('mongoose')

const adsSchema = mongoose.Schema(
    {
        name: { type: String },
        hits: { type: String },
        publisher: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        embedUrl: { type: [String] },
        priority: {
            type: Number,
            default: 5,
            validate: [
                priority => priority <= 10 && priority >= 0,
                'Invalid priority value. Expected between [0, 10]',
            ],
        },
    },
    { timestamps: true }
)

module.exports = mongoose.model('Article', articleSchema)
