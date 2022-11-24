const router = require('express').Router()
const {registrationController, loginController, logoutController} = require('../controllers/authControllers')

// REGISTER
router.post('/register', registrationController)

// LOGIN 
router.post('/login', loginController)

// LOGOUT
router.get('/logout', logoutController)




module.exports = router