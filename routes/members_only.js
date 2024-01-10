const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController')
const MessageController = require('../controllers/MessageController')

router.get('/', MessageController.getIndex)

router.get('/sign-up',  UserController.signUpGet)

router.post('/sign-up', UserController.signUpPost)

router.get('/log-in', UserController.loginGet)

router.post('/log-in', UserController.loginPost)

// Main page where members can post their messages
router.get('/messages', MessageController.messageListGet)

/** Same page will have a for to post messages when they are logged in! */
router.post('/messages', MessageController.createMessagePost)

router.get('/message/:id/delete', MessageController.deleteMessageGet)

router.post('/message/:id/delete', MessageController.deleteMessagePost)
module.exports = router