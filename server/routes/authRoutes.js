const router = require('express').Router()
const {registrationController, loginController, forgotPassword, resetPassword, updatePassword, logout, emailVerificationController} = require('../controllers/authControllers')
const {checkingUser} = require('../middleware/registerValidation')
const {protect, restrictTo} = require('../middleware/authMiddleware')
const passport = require("passport")


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

// EMAIL VERIFICATION
router.patch("/emailVerification/:id", emailVerificationController)

router.get("/google", passport.authenticate("google", {scope: ["profile"]}))
router.get("/auth/callback/google", passport.authenticate("google", {failureRedirect: "/", }), (req, res) => {
  res.redirect("/events")
})





module.exports = router