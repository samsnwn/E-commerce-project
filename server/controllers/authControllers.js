const User = require('../models/UserModel')
const ExpressError = require("../ExpressError");
const bcrypt = require("bcrypt");


// Registration Controller
exports.registrationController = async (req, res, next) => {
    const user = req.body
    try {
        const newUser = new User(user)
        // password encryption
        const salt = await bcrypt.genSalt(12)
        const hash = await bcrypt.hash(newUser.password, salt)
        newUser.password = hash
        
        // save newUser to DB
        await newUser.save();

        // response to frontend
        res.status(200).json(newUser)
    } catch (err) {
        // error handling
        next(new ExpressError('Failed to register, please try again', 500))
    }
}

// Login Controller
exports.loginController = async (req, res, next) => {
    const {email, password} = req.body
    try {
        const user = await User.findOne({email:email})

        // check if passwords match
        const passwordsMatch = await bcrypt.compare(password, user.password)

        // If they match, assign user to session, set isAuth state and send back user(without password) and state to frontend
        if(passwordsMatch) {
            // Get the user ID from database
            const id = user._id.toString();
            req.session.isAuth = true
            req.session.user = await User.findOne({email:email}).select('-password')
            res.send({user:req.session.user, isAuth: req.session.isAuth})

            // assign req.user 
            // req.user = {...user._doc, password:null}
        } else {
            throw new ExpressError('Email or password not valid', 500)
        }
    } catch (err) {
        next(new ExpressError('Email or password not valid', 500))
    }
}

exports.logoutController = async (req, res, next) => {
    req.session.destroy()
    res.json({isAuth:false})
}