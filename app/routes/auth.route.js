// Set up router =========================================================================
const express = require('express')
const router = express.Router()
const passport = require('passport')
const jwt = require('jsonwebtoken')
const key = require('../../config/key')
// Import model ==========================================================================
const User = require('../models/user.model')

router.get('/index', (req,res) => {
    res.render('index')
})

router.get('/register', (req,res) => {
    res.render('register')
})

router.post('/register', (req,res) => {
    let { email, username, password, password2 } = req.body
    let errors = []

    if (!email || !username || !password || !password2) {
        errors.push({ msg: 'Please enter all field'})
    }

    if (password != password2) {
        errors.push({ msg: 'Passwords do not match' })
    }

    if (password.length < 6) {
        errors.push({ msg: 'Password must be at least 6 characters' })
    }

    if (errors.length > 0) {
        res.render('register', { errors, email, username })
    } else {
        User.findOne({ 'local.username': username }, (err,user) => {
            if (err) throw err
            
            if (user) {
                errors.push({ msg: 'Username already exists' })
                res.render('register', { errors, email, username})
            } else {
                let user = new User()

                user.local.email    = email
                user.local.username = username
                user.local.password = user.generateHash(password)

                user.save()
                .then(user => {
                    req.flash('success_msg','You are now registered and can login')
                    res.redirect('/index')
                })
                .catch(err => console.log(err))
            }
        })
    }
})

router.post('/index', passport.authenticate('local', {
    failureRedirect: '/index',
    failureFlash: true,
    session: false
    }), (req,res) => {
        let payload = {
            sub: req.body.username,
            iat: new Date().getTime()
        }
        let token = jwt.sign(payload, key.secret)
        res.cookie('jwt', token, { httpOnly: true })
        res.redirect('/profile')
    }
)

module.exports = router