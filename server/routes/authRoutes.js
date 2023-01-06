const router = require('express').Router()
const {registrationController, loginController, logoutController} = require('../controllers/authControllers')
const {checkingUser} = require('../middleware/registerValidation')

// REGISTER
router.post('/register', registrationController)

// LOGIN 
router.post('/login', loginController)

// LOGOUT
router.get('/logout', logoutController)




module.exports = router