const router = require('express').Router()
const {registrationController, loginController, forgotPassword, resetPassword, updatePassword, protect, restrictTo, logout} = require('../controllers/authControllers')
const {checkingUser} = require('../middleware/registerValidation')

// REGISTER
router.post('/register', checkingUser, registrationController)

// LOGIN 
router.post('/login', loginController)

// FORGOT AND RESET PASSWORD
router.post('/forgotPassword', forgotPassword)
router.patch('/resetPassword/:token', resetPassword)

//  UPDATE PASSWORD
router.patch('/updateMyPassword', protect, updatePassword)

// LOGOUT
router.post('/logout', logout)





module.exports = router