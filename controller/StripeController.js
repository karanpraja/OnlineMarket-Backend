// // This is your test secret API key.
// const stripe = require('stripe')('sk_test_51OdmoiSB02QNHAyRyZHy5mn65Rjm1ocUHVMBP4Bp7IBWFnX2TVuRjHqhRvf5mhObExT4QeJ4TcSnrgIbG4oLFhl300EzEIN3DI');
// const express = require('express');
// // const app = express();
// // app.use(express.static('public'));

// const YOUR_DOMAIN = 'http://localhost:3000';

//  exports.StripeController= async (req, res) => {
//     const {id,totalAmount,quantity}=req.body
//   const session = await stripe.checkout.sessions.create({
//     line_items: [
//       {
//         // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
//         price: totalAmount,
//         quantity: quantity,
//       },
//     ],
//     mode: 'payment',
//     success_url: `${YOUR_DOMAIN}/checkorder/${id}`,
//     cancel_url: `${YOUR_DOMAIN}/errorpage`,
//   });

//   res.redirect(303, session.url);
// }
