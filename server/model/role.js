const mongoose = require('mongoose')

const roleSchema = mongoose.Schema({
    name: { type: String },
    isRoot: { type: Boolean, default: false },
    canPublish: { type: Boolean, default: false },
    canCreate: { type: Boolean, default: false },
    isReporter: { type: Boolean, default: false },
})

module.exports = mongoose.model('Role', roleSchema)
