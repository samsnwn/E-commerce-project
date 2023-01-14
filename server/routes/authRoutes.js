const router = require('express').Router()
const {registrationController, loginController} = require('../controllers/authControllers')
const {checkingUser} = require('../middleware/registerValidation')

// REGISTER
router.post('/register', registrationController)

// LOGIN 
router.post('/login', loginController)

// LOGOUT





module.exports = router