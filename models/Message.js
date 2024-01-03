const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MessageSchema = new Schema({
    title: { type:String, required:true },
    user_id: { type: Schema.Types.ObjectId, required: true},
    timestamp: {type: Date, default: Date.now},
    text: String
})

const Message = mongoose.model(
    'Message',
    MessageSchema
)

module.exports = Message