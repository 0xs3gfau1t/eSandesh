const mongoose = require('mongoose')

const audioSchema = mongoose.Schema(
    {
        name: String,
        data: Buffer,
    },
    { timestamps: true }
)

module.exports = mongoose.model('Audio', audioSchema)
