const router = require('express').Router()
const {registrationController, loginController} = require('../controllers/authControllers')

// REGISTER
router.post('/register', registrationController)

// LOGIN 
router.post('/login', loginController)




module.exports = router