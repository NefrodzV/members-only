const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController')
const MessageController = require('../controllers/MessageController')

router.get('/', MessageController.index)

router.get('/sign-up',  UserController.sign_up_get)

router.post('/sign-up', UserController.sign_up_post)

router.get('/log-in', UserController.log_in_get)

router.post('/log-in', UserController.log_in_post)

// Main page where members can post their messages
router.get('/messages', MessageController.message_list)

/** Same page will have a for to post messages when they are logged in! */
router.post('/messages', MessageController.create_message_post)




module.exports = router