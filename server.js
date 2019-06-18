// For our express application =====================================================
const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const expressLayouts = require('express-ejs-layouts')
const path = require('path')
// For database ====================================================================
const mongoose = require('mongoose')
// For Passport ====================================================================
const passport = require('passport')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const flash = require('connect-flash')

// Passport Config
require('./config/passport')(passport)

// Connect Database ================================================================
const db = require('./config/key')
mongoose.connect(db.mongoURI,db.set)
        .then(() => console.log('MongoDB Connected'))
        .catch(err => console.log(err))

// Set up our express application ==================================================
app.use(morgan('dev')) // Logging
app.use(bodyParser.urlencoded({extended: true})) // Get information from html forms
app.use(bodyParser.json()) // Get information from html forms
app.use(expressLayouts) // Set up layout for templating
app.set('views','./app/views') // Set up part for templating
app.set('view engine','ejs') // Set up ejs for templating
app.use(express.static(path.join(__dirname, 'public'))) // Get static file 

// Required for passport
app.use(session({
    secret: 'CRIMSON_SESSION', // session secret
    resave: true,
    saveUninitialized: true
}));
app.use(cookieParser()) // Store token in cookie
app.use(flash()) // Connect flash

// Global Variables ================================================================
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash('error')
    next()
})

// Routes ==========================================================================
app.use('/', require('./app/routes/auth.route'))
app.use('/', require('./app/routes/user.route'))

// Connect Port ====================================================================
const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server started on port ${PORT}`))