const JwtStrategy = require("passport-jwt").Strategy //ใช้ในการ decode jwt ออกมา
const ExtractJwt = require("passport-jwt").ExtractJwt
const User = require('../app/models/user.model')

module.exports = (passport) => {
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