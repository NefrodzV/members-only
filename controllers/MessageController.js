const Message = require('../models/Message')

/** Show the messages of members, but only be visible (name and date)
 *  to logged in users messages. Have a form to send messages if user is logged
 * in. Make admin be able to delete messages */
exports.index = async (req, res, next) => {
    // TODO: CHECK IF THERE IS A USER LOGGED IN IF NOT REDIRECT TO SIGN UP
    res.render('index', { title: 'Members only' })
}

exports.message_list = (req, res, next) => {
    res.render('messages')
}

// Sends the new message to the database
exports.create_message_post = (req, res, next) => {
    res.send('Messages post not implemented')
}

exports.delete_message_post = (req, res, next) => {
    res.send('Delete message not implemented')
}