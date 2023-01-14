const router = require('express').Router()
const stripe = require('stripe')(process.env.STRIPE_KEY)

const {paymentController} = require('../controllers/stripeController')

router.post('/payment' , paymentController)

module.exports = router