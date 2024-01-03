const { ObjectId } = require('mongodb')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    first_name: {type:String, required:true},
    last_name: {type:String, required:true},
    email: {type:String, required:true, unique:true},
    password: {type:String, required:true},
    membership: {
        type: String, 
        required: true,
        enum: ['Basic', 'Standard', 'Premium'],
        default: 'Basic'
    },
})

UserSchema.virtual('fullname').get(() => {
    return this.first_name + " " + this.last_name
})




module.exports = mongoose.model('User', UserSchema)