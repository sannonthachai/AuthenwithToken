// For Local =============================================================================
const LocalStrategy = require('passport-local').Strategy
// For JWT ===============================================================================
const JwtStrategy = require("passport-jwt").Strategy //ใช้ในการ decode jwt ออกมา
const ExtractJwt = require("passport-jwt").ExtractJwt
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
                if (err) throw err

                if (!user) 
                    return done(null, false, { message: 'That username is not registered' })
                
                if (!user.validPassword(password)) 
                    return done(null, false, { message: 'Password incorrect' })
                
                else
                    return done(null,user)
            })
        })
    )

    passport.use(new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: 'CRIMSON_SECRET_KEY'
    },
    (jwtPayload, done) => {
        User.findById(jwtPayload.id)
            .then(user => {
                return done(null, user)
            })
            .catch(err => {
                return done(err)
            })
    }))
}