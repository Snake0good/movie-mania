const User = require('./User')
const bcrypt = require('bcrypt')

// handle errors 
const handleError = (err) => {
    console.log(err.message, err.code);
    let errors = { email: '', password: '' };

    // duplicate error code
    if (err.code === 11000) {
        errors.email = 'That email is already registered'
    }

    // validation errors 
    if (err.message.includes('user validation failed')) {
        (Object.values(err.errors)).forEach(({properties}) => {
            errors[properties.path] = properties.message
        })
    }
    return errors;
}

module.exports.signup_get = async (req, res) => {
    res.render('signup')
}

module.exports.login_get = async (req, res) => {
    console.log('working here')

}

// signing up a new user
module.exports.signup_post = async (req, res) => {
    const { email, password } = req.body 

    try {
        const user = await User.create({ 
            email: req.body.email, 
            password: req.body.password });
        res.status(200).json('you are in')
    } 

    catch (err) {
        const errors = handleError(err)
        res.status(400).json({ errors });
    }
    
}

// logging in a returning user
module.exports.login_post = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            return res.status(401).send({ message: "No user with that email" })
        }

        const validPassword = await bcrypt.compare(req.body.password, user.password)

        if (!validPassword) {
            return res.status(401).send({ message: "Invalid password" })
        }

        res.status(200).send({ message: "Logged in successfully! " })

    } catch(err) {
        res.status(500).send(err)
    }
}

