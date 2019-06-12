const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const expressLayouts = require('express-ejs-layouts')
const path = require('path')
const bodyParser = require('body-parser')
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

// Express body-parser
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())

// Static file
app.use(express.static(path.join(__dirname, 'public')))

// Routes
app.use('/', require('/app/routes/user'))


const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server started on port ${PORT}`))