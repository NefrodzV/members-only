const express = require('express')
const router = express.Router()

router.get('/', async (req, res, next) => {
    res.render('index', {title: 'Members only'})
})

router.get('/sign-up',  async (req, res, next) => {
    res.render('sign-up-form')
})

router.post('/sign-up', async (req, res, next) => {
    res.send('Sign up post not implemented')
})

router.get('/log-in', async (req, res, next) => {
    res.send('Log in get not implemented')
})

router.post('/log-in', async (req, res, next) => {
    res.send('Log in post not implemented')
})

// Main page where members can post their messages
router.get('/messages', (req, res, next) => {
    res.send('Messages path not implemented')
})

// Maybe change this form post to another path
router.post('/messages', (req, res, next) => {
    res.send('Messages post not implemented')
})




module.exports = router