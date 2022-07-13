const mongoose = require('mongoose')
const { isEmail } = require('validator')
const bcrypt = require('bcrypt')


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true, 
        lowercase: true, 
        validate: isEmail,
    },
    password: {
        type: String,
        required: [true, 'Please enter an password'],
        minlength: [6, 'Minimum password length is 6 characters']
    }
});


// fire a function after doc saved to db
userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

const User = mongoose.model('user', userSchema);

module.exports = User;