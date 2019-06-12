const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    local: {
        email: String,
        username: String,
        password: String
    }
})

// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password)
}

// create the model for users and expose it to our app
const User = mongoose.model('User', userSchema)
module.exports = User