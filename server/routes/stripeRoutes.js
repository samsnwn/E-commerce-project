const router = require('express').Router()
const { createCheckoutSession } = require('../controllers/stripeControllers')


router.post("/create-checkout-session", createCheckoutSession)

module.exports = router
