const mongoose = require('mongoose')

const pollSchema = new mongoose.Schema(
    {
        question: { type: String },
        options: [
            {
                text: String,
                users: {
                    type: [mongoose.Schema.Types.ObjectId],
                    ref: 'User',
                    default: [],
                },
            },
        ],
        expiry: { type: Date, required: true },
    },
    { timestamps: true }
)

module.exports = mongoose.model('Poll', pollSchema)
