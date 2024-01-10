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
exports.createMessagePost = async (req, res, next) => {
    res.send('Messages post not implemented')
}

exports.deleteMessageGet = async(req, res, next) => {
    res.send('Delete message get not implemented')
}

exports.deleteMessagePost = async(req, res, next) => {
    res.send('Delete message not implemented')
}