// For Local =============================================================================
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
// For JWT ===============================================================================
const JwtStrategy = require("passport-jwt").Strategy
const cookieExtractor = (req => {
    let token = null
    if (req && req.cookies) token = req.cookies['jwt']
    return token
})
const key = require('../config/key')
// Import model ==========================================================================
const User = require('../app/models/user.model')

module.exports = (passport) => {
    passport.use(new LocalStrategy({ 
        usernameField: 'username',
        passwordField: 'password' 
      }, (username, password, done) => {
            User.findOne({
              'local.username': username
            }).then(user => {
                if (!user) 
                    return done(null, false, { message: 'That username is not registered' })
                
                bcrypt.compare(password, user.local.password, (err, isMatch) => {
                    if (err) throw err
                    if (isMatch) {
                        return done(null, user)
                    } else {
                        return done(null, false, { message: 'Password incorrect' })
                    }
                })
            })
        })
    )

    passport.use(new JwtStrategy({
        jwtFromRequest: cookieExtractor,
        secretOrKey: key.secret
    }, (payload, done) => {
            User.findOne({ 'local.username': payload.sub })
                .then(user => {
                    return done(null, user)
                })
                .catch(err => {
                    return done(err)
                })
        }
    ))
}