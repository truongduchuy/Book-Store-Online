module.exports = require('nodemailer').createTransport({
  // turn on https://myaccount.google.com/lesssecureapps before sending mail
  pool: true,
  host: 'smtp.ionos.com',
  port: 465,
  secure: true, // use TLS
  auth: {
    user: process.env.SHOP_EMAIL,
    pass: process.env.SHOP_PASSWORD,
  },
});
