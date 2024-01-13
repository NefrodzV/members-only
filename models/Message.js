const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MessageSchema = new Schema({
    title: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref:'User',required: true},
    timestamp: { type: Date, default: Date.now },
    text: String
})

MessageSchema.virtual('url').get( function() {
    return '/members-only/message/'+ this._id
})

module.exports = mongoose.model(
    'Message',
    MessageSchema
)