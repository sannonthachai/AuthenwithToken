const JwtStrategy = require("passport-jwt").Strategy //ใช้ในการ decode jwt ออกมา
const ExtractJwt = require("passport-jwt").ExtractJwt
const User = require('../app/models/user.model')
const SECRET = 'MY_SECRET_KEY'