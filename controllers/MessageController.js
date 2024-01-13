const { body, validationResult } = require('express-validator')
const Message = require('../models/Message')

/** Show the messages of members, but only be visible (name and date)
 *  to logged in users messages. Have a form to send messages if user is logged
 * in. Make admin be able to delete messages */
exports.getIndex = async (req, res, next) => {
    const messageList = await Message.find().populate('user').exec()
  console.log(messageList)
    // Only runs if there is a user logged in
    if(req.user) {
        console.log('There is a user logged in')
        res.render('index', {
          title: 'Members only',
          user: req.user,
          messages: messageList
        })
        return
    }
    
    res.render('index', { 
        title: 'Members only',
        messages: messageList
     })
}

exports.messageListGet = (req, res, next) => {
    res.render('messages list get not implemented')
}

// Sends the new message to the database
exports.createMessagePost = [
    body('title', 'Title cannot be empty')
        .isLength({ min:1 })
        .escape(),
    body('message', 'message cannot be empty!')
        .isLength({ min: 1 })
        .escape(),
    
    async (req, res, next) => {
        const result = validationResult(req)
        const messageList = await Message.find().populate('user').exec()
        console.log('user loggged in')
        console.log(req.user)

        if(!result.isEmpty()) {

            const titleError = result.array().filter(val => val.path === 'title')[0].msg
            const messageError = result.array().filter(val => val.path === 'message')[0].msg
            
            res.render('index', {
                user: req.user,
                messages : messageList,
                titleError: titleError,
                messageError: messageError
            })
            return
        }
        console.log('user after checking errors')
        console.log(req.user)
        const message = new Message({
            title: req.body.title,
            user: req.user._id,
            text: req.body.message
        })

        await message.save().catch(e => console.log('Error sending to db:' + e))

        res.redirect('/members-only')
    }
]

exports.deleteMessageGet = async(req, res, next) => {
    const message = await Message.findById(req.params.id).populate('user')
    res.render('message-delete', { message: message })
}

exports.deleteMessagePost = async(req, res, next) => {
    await Message.findByIdAndDelete(req.body.message_id)
    res.redirect('/members-only')
}