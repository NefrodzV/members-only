const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    firstName: {type:String, required:true},
    lastName: {type:String, required:true},
    email: {type:String, required:true, unique:true},
    password: { type:String, required:true},
    isMember: { type:Boolean, default:false, required:true},
    isAdmin: { type: Boolean, default: false}
})

UserSchema.virtual('fullname').get(() => {
    return this.first_name + " " + this.last_name
})




module.exports = mongoose.model('User', UserSchema)