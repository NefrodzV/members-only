const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy 
const bcryptjs = require('bcryptjs')
const User = require('./models/User')

const Auth = (() => {
    const instance = passport

    instance.use(
        new LocalStrategy({ passReqToCallback:true },async (req,email, password, done) => {

            try {
                const user = await User.findOne({email: email})
                if(!user) {
                    req.session.inputs = {
                        email: email,
                        password: password
                    }
                    await req.session.save()
                    return done(null, false, {message: 'Incorrect username' })
                }

                const match = await bcryptjs.compare(password, user.password)
                if(!match){
                    req.session.inputs = {
                        email: email,
                        password: password
                    }
                    await req.session.save()
                    return done(null, false, {message: 'Incorrect password'})
                } 

                return done(null, user)
            } catch(err) {
                return done(err)
            }
        })
    )

    instance.serializeUser((user, done) => {
        console.log(user)
        done(null, user._id)
    })

    instance.deserializeUser( async (id, done) => {
        try {
            const user = await User.findById(id)
            done(null, user)
        }catch(err) {
            done(err)
        }
    })

    return {
        instance
    }
})()


module.exports = Auth
  

