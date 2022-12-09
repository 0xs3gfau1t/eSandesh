const mongoose = require('mongoose')

const adSchema = mongoose.Schema(
    {
        name: { type: String },
        hits: { type: String, default: 0 },
        publisher: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        imageEmbedUrl: { type: String },
        redirectUrl: { type: String },
        priority: {
            type: Number,
            default: 5,
            validate: [
                priority => priority <= 10 && priority >= 0,
                'Invalid priority value. Expected between [0, 10]',
            ],
        },
        price: { type: Number, required: true },
        size: {
            type: String,
            default: 'rectX',
            validate: [
                size => ['rectX', 'rectY', 'square'].includes(size),
                'Invalid size.',
            ],
        },
        category: { type: [String] },
        expiry: { type: Date, required: true },
    },
    { timestamps: true }
)

module.exports = mongoose.model('Ad', adSchema)
