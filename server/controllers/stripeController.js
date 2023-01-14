const stripe = require('stripe')(process.env.STRIPE_KEY)
const ExpressError = require("../ExpressError");


exports.paymentController = (req, res, next) => {
    stripe.charges({
        source: req.body.tokenId,
        amount: req.body.amount,
        currency: 'eur'
    }, (stripeError, stripeResponse) => {
        if(stripeError) {
            next(new ExpressError("Failed payment", 500));
        } else {
            res.status(200).json(stripeResponse)
        }
    })
}