const mongoose = require('mongoose')

const adImageSchema = mongoose.Schema({
    rectX /* Link to image */: { type: String, default: null },
    rectY: { type: String, default: null },
    square: { type: String, default: null },
})

const adSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        hits: { type: String, default: 0 },
        publisher: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        image: adImageSchema,
        audio: { type: String },
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
        category: { type: [String], required: true },
        expiry: { type: Date, required: true },
        popup: { type: Boolean, default: false },
    },
    { timestamps: true }
)

module.exports = mongoose.model('Ad', adSchema)
