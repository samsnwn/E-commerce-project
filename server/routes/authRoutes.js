const router = require('express').Router()
const {registrationController, loginController, forgotPassword, resetPassword} = require('../controllers/authControllers')
const {checkingUser} = require('../middleware/registerValidation')

// REGISTER
router.post('/register', registrationController)

// LOGIN 
router.post('/login', loginController)

// FORGOT AND RESET PASSWORD
router.post('/forgotPassword', forgotPassword)
router.patch('/resetPassword/:token', resetPassword)

// LOGOUT





module.exports = router