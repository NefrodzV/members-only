const { ObjectId } = require('mongodb')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    firstName: {type:String, required:true},
    lastName: {type:String, required:true},
    email: {type:String, required:true, unique:true},
    password: {type:String, required:true},
    membership: {
        type: String, 
        required: true,
        enum: ['Basic', 'Premium'],
        default: 'Basic'
    },
    isAdmin: {type: Boolean, default: false}
})

UserSchema.virtual('fullname').get(() => {
    return this.first_name + " " + this.last_name
})




module.exports = mongoose.model('User', UserSchema)