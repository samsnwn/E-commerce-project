import express from 'express';
const router = express.Router();
import {registrationController, loginController,googleLoginController, forgotPassword, resetPassword, updatePassword, logout, emailVerificationController, googleRegistrationController} from '../controllers/authControllers.js'
import {checkingUser}from '../middleware/registerValidation.js'
import {protect, restrictTo} from '../middleware/authMiddleware.js'


// REGISTER
router.post('/register', checkingUser, registrationController)

// Google REGISTER
router.post('/google-register', googleRegistrationController)

// LOGIN 
router.post('/login', loginController)

// GOOGLE LOGIN 
router.post('/google-login', googleLoginController)

// FORGOT AND RESET PASSWORD
router.post('/forgotPassword', forgotPassword)
router.patch('/resetPassword/:token', resetPassword)

//  UPDATE PASSWORD
router.patch('/updateMyPassword', protect, updatePassword)

// LOGOUT
router.post('/logout', logout)

// EMAIL VERIFICATION
router.patch("/emailVerification/:id", emailVerificationController)


export default router;