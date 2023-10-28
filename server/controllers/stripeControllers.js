// const stripe = require("stripe")(process.env.STRIPE_KEY);

// const createCheckoutSession = async (req, res) => {
//   const cart = req.body
//   const line_items = cart.map((item) => {
//     return {
//       price_data: {
//         currency: "eur",
//         product_data: {
//           name: item.title,
//           images: [item.image],
//           description: item.description,
//           metadata: {
//             id: item._id,
//           },
//         },
//         unit_amount: item.price * 100,
//       },
//       quantity: 1,
//     };
//   });

//   try {
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       shipping_address_collection: { allowed_countries: ["ES", "DE"] },
//       shipping_options: [
//         {
//           shipping_rate_data: {
//             type: "fixed_amount",
//             fixed_amount: { amount: 0, currency: "eur" },
//             display_name: "Free shipping",
//             delivery_estimate: {
//               minimum: { unit: "business_day", value: 5 },
//               maximum: { unit: "business_day", value: 7 },
//             },
//           },
//         },
//       ],
//       phone_number_collection: {
//         enabled: true,
//       },
//       line_items,
//       mode: "payment",
//       success_url: `${process.env.CLIENT_URL}/checkout-success`,
//       cancel_url: `${process.env.CLIENT_URL}/cart`,
//     });

//     res.json({ url: session.url });
//   } catch (err) {
//     console.error(err);
//     res
//       .status(500)
//       .send({ error: "An error occurred while creating checkout session" });
//   }
// };

// export default { createCheckoutSession };
