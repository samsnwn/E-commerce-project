// const router = require('express').Router()
// const { createCheckoutSession } = require('../controllers/stripeControllers')
// const stripe = require('stripe')(process.env.STRIPE_KEY)



// router.post("/create-checkout-session", createCheckoutSession)

// router.get('/secret', async (req, res) => {
//   const paymentIntent = await stripe.paymentIntents.create({
//     amount: 1099,
//     currency: 'eur',
//     automatic_payment_methods: {enabled: true},
//   });
//   res.json({client_secret: paymentIntent.client_secret});
// });

// module.exports = router
