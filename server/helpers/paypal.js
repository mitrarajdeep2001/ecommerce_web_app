const paypal = require("paypal-rest-sdk");
// console.log(process.env.PAYPAL_SECRET_KEY);

paypal.configure({
  mode: "sandbox",
  client_id: process.env.PAYPAL_CLIENT_ID,
  client_secret: process.env.PAYPAL_SECRET_KEY,
});

module.exports = paypal;
