module.exports = require('nodemailer').createTransport({
  // turn on https://myaccount.google.com/lesssecureapps before sending mail
  service: 'gmail',
  auth: {
    user: process.env.SHOP_EMAIL,
    pass: process.env.SHOP_PASSWORD,
  },
});
