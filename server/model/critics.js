const mongoose = require('mongoose')

const criticSchema = mongoose.Schema(
    {
        // It's existence will denote that this critic is from portal itseld
        commentId: { type: mongoose.Schema.Types.ObjectId },

        // Below 3 information/attribute should only exist if the comment is outside of portal
        name: { type: String },
        postLink: { type: String },
        content: { type: String },

        // This field only exists if publisher/admin selects a particular comment eligible to be displayed as critic [ML project area 1 detected]
        // At most X amount of `registerPossibleCritic` will have this attribute in existence
        // This attribute will be used to aggregate selected critics to display using yesterday's date tomorrow
        publishedAt: { type: Date },
    },
    { timestamps: true }
)

module.exports = mongoose.model('Critics', criticSchema)
