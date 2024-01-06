const User = require('../models/User')
const bcryptjs = require('bcryptjs')
const { body, validationResult } = require('express-validator')
const Auth = require('../Auth')
require('dotenv').config()

exports.sign_up_get = async (req, res, next) => {
    res.render('sign-up-form')
}

exports.sign_up_post = [
    body('first_name', 'First name cannot be empty').trim().isLength({ min: 1}).escape(),
    body('last_name', 'Last name cannot be empty').trim().isLength({ min: 1}).escape(),
    body('email', 'Email cannot be empty').trim().isLength({ min: 1 }).isEmail().withMessage('This has to be an email').escape(),
    body('password', 'Password cannot be empty').trim().isLength({ min:1 }).escape(),
    body('confirm_password', 'Confirm password cannot be empty').trim().isLength({ min:1 }).escape(),
    body('confirm_password', 'Confirm password not equal password').custom((value, { req }) => {
        return value === req.body.password
    }),
    body('code', ' Membership code cannot be empty').trim().isLength({ min: 1}).escape(),
    body('code', 'Incorrect membership code!').custom((val, { req })=> {
        return val === process.env.MEMBERS_ONLY_CODE
    }),

    async (req, res, next) => {
        const result = validationResult(req)
        const isPremium = req.body.code === process.env.MEMBERS_ONLY_CODE

        if(!result.isEmpty()) {
            res.render('sign-up-form', {
                first_name: req.body.first_name, 
                last_name: req.body.last_name,
                email: req.body.email,
                password: req.body.password,
                code: req.body.code,
                errors: result.array()
            })
            return 
        }
        
        // Encrypting password before sending it to db
        bcryptjs.hash(req.body.password, 10, async (err, hashedPassword) => {
            if(err) throw new Error('Error with hashed password!')
            try { 
                const user = new User({
                    firstName: req.body.first_name,
                    lastName: req.body.last_name,
                    email: req.body.email,
                    password: hashedPassword,
                    membership : isPremium ? 'Premium' : 'Basic'
                })
                await user.save()
                
                res.redirect('/members-only/log-in')
            } catch(err) {
                // If the error has the mongo db error code for duplicate id
                if(err.code === 11000) {
                    res.render('sign-up-form', {
                        first_name: req.body.first_name, 
                        last_name: req.body.last_name,
                        email: req.body.email,
                        password: req.body.password,
                        code: req.body.code,
                        errors: [{ msg: 'Email already registered!' }]
                    })
                }
            }
        })
    }
]

exports.log_in_get = async (req, res, next) => {
    res.render('log-in-form')
}

exports.log_in_post = [
    body('username', 'Email cannot be empty')
    .trim()
    .isLength({ min:1 })
    .isEmail()
    .withMessage('Incorrect email format!').escape(),
    body('password', 'Password cannot be empty')
    .trim()
    .isLength({ min:1 })
    .escape(),
    
    async (req, res, next) => {
        const result = validationResult(req)

        // If there are errors re-render
        if(!result.isEmpty()) {
            res.render('log-in-form', {
                username: req.body.username,
                password: req.body.password
            })
            return
        }
        next()
    },

    Auth.instance.authenticate('local', {
        successRedirect: '/',
        failureRedirect: ''
    })

    

]

