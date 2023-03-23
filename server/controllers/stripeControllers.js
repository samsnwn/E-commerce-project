const stripe = require('stripe')(process.env.STRIPE_KEY)

let lineItems = []
const createCheckoutSession = async (req, res) => {
  const items = req.body
  items.forEach(item => {
    return lineItems.push({
      price:item.priceId,
      quantity:1
    })
  })
  try {

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url:  `${process.env.CLIENT_URL}/checkout-success`,
      cancel_url:`${process.env.CLIENT_URL}/cart`,
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'An error occurred while creating checkout session' });
  }
};

module.exports = { createCheckoutSession };