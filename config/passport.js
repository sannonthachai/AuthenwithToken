// For Local =============================================================================
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
// For JWT ===============================================================================
const JwtStrategy = require("passport-jwt").Strategy //ใช้ในการ decode jwt ออกมา
const ExtractJwt = require("passport-jwt").ExtractJwt
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
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
        secretOrKey: key.secret
    },
    (jwtPayload, done) => {
        User.findOne({ 'local.username': jwtPayload.id })
            .then(user => {
                return done(null, user)
            })
            .catch(err => {
                return done(err)
            })
    }))
}