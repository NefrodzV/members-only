const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MessageSchema = new Schema({
    title: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, required: true},
    timestamp: { type: Date, default: Date.now },
    text: String
})

const Message = 

module.exports = mongoose.model(
    'Message',
    MessageSchema
)