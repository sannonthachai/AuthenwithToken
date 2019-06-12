const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const expressLayouts = require('express-ejs-layouts')
const path = require('path')
const bodyParser = require('body-parser')
const flash = require('connect-flash')
const app = express()

// Connect Database
const db = require('./config/key')
mongoose.connect(db.mongoURI,db.set)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err))

// Logging 
app.use(morgan('dev'))

// EJS
app.use(expressLayouts)
app.set('views','./app/views')
app.set('view engine','ejs')

// Static File
app.use(express.static(path.join(__dirname, 'public')))

// Express Body-parser
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())

// Connect Flash
app.use(flash())

// Global Variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash('error')
    next()
})

// Routes
app.use('/', require('./app/routes/user.route'))

// Connect Port
const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server started on port ${PORT}`))