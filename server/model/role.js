const mongoose = require('mongoose')

const roleSchema = mongoose.Schema({
    name: { type: String },
    isRoot: { type: Boolean },
    canPublish: { type: Boolean },
    canCreate: { type: Boolean },
    isReporter: { type: Boolean },
})

module.exports = mongoose.model('Role', roleSchema)
