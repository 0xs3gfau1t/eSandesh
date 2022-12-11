const mongoose = require('mongoose')

const pollSchema = new mongoose.Schema({
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
})

module.exports = mongoose.model('Poll', pollSchema)
