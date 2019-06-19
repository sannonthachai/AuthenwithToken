const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = mongoose.Schema({
    local: {
        email: String,
        username: String,
        password: String
    }
})

// Generating a hash
userSchema.methods.generateHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

// Create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema)