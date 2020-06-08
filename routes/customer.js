const express = require('express');
const Customer = require('../models/customer');
const Book = require('../models/book');
const Order = require('../models/order');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const isOperationValid = require('./utils/checkOperationValid');
const auth = require('../middleware/authCustomer');
const transporter = require('../config/transporter');
const path = require('path');
const Email = require('email-templates');

const emailEngine = new Email({
  views: {
    options: {
      extension: 'ejs', // <---- HERE
    },
  },
});

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const newCustomer = new Customer(req.body);

    newCustomer.password = await bcrypt.hash(newCustomer.password, 8);

    await newCustomer.save();

    res.send(newCustomer);
  } catch (e) {
    console.log(e.message);
    res.status(500).send();
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) res.status(403).send();

    const customer = await Customer.findByCredentials(email, password);
    const token = jwt.sign({ _id: customer._id }, process.env.JWT_SECRET, { expiresIn: '5h' });

    res.send({ customer, token });
  } catch (e) {
    console.log(e.message);
    res.status(500).send(e);
  }
});

router.patch('/changePass', auth, async (req, res) => {
  try {
    const { password, newPassword } = req.body;

    const isMatch = await bcrypt.compare(password, req.customer.password);

    if (!isMatch) throw new Error('password is incorrect!');

    const newPassHashed = await bcrypt.hash(newPassword, 8);

    req.customer.password = newPassHashed;
    await req.customer.save();
    res.send({ success: true });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ error: e.message });
  }
});

router.patch('/', auth, async (req, res) => {
  try {
    const { body } = req;

    const updates = Object.keys(body);
    const allowedUpdates = ['username', 'phoneNumber', 'address', 'email'];

    if (!isOperationValid(updates, allowedUpdates)) {
      res.status(400).json({ error: 'Bad request!' });
    }

    updates.forEach(update => (req.customer[update] = body[update]));

    await req.customer.save();

    res.send(req.customer);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ error: e.message });
  }
});

router.post('/order', auth, async (req, res) => {
  try {
    const { cart, currentCustomer } = req.body;
    const { _id, email, username } = req.customer;
    const { phoneNumber, address } = currentCustomer;

    if (!cart) res.sendStatus(400);

    const order = new Order({
      cart,
      customer: {
        customerInfo: _id,
        phoneNumber,
        address,
      },
    });

    await order.save();

    await order.populate('cart.bookId').execPopulate();

    const books = order.cart.map(({ bookId }) => bookId);

    // minus quantity right after bought
    Promise.all(
      order.cart.map(async item => {
        const book = await Book.findOne({ _id: item.bookId });
        book.quantity = book.quantity - item.quantity;
        return await book.save();
      }),
    ).then(books => console.log('quantity updated successfully!'));

    // add sold books to customer
    req.customer.boughtList = books.map(({ _id }) => _id);
    await req.customer.save();

    const total = books.reduce(
      (acc, book, index) => acc + Number(book.price) * Number(order.cart[index].quantity),
      0,
    );
    emailEngine
      .render(path.join(__dirname, '../views/mailTemplate2'), {
        appName: 'Huy tru Store',
        recipientName: username,
        body: 'Thanks for your payment',
        subject: 'Payment',
        cart: books.map((book, index) => ({
          title: book.title,
          // imageUrl: book.imageUrl,
          price: book.price,
          quantity: order.cart[index].quantity,
          subtotal: Number(book.price) * Number(order.cart[index].quantity),
        })),
        total,
      })
      .then(html =>
        transporter.sendMail(
          {
            from: process.env.SHOP_EMAIL,
            to: email,
            subject: 'PAYMENT',
            html,
          },
          (error, info) => {
            if (error) {
              return console.log(error);
            }
            console.log('message sent successfully!');
          },
        ),
      )
      .catch(console.error);

    res.send({ success: true });
  } catch (e) {
    console.log(e.message);
    res.sendStatus(500);
  }
});

router.get('/orders', auth, async (req, res) => {
  try {
    // exec() is used with a query
    // execPopulate() is used with a document
    await req.customer
      .populate({
        path: 'orders',
        options: {
          sort: {
            createdAt: -1,
          },
        },
        populate: {
          path: 'cart.bookId',
        },
      })
      .execPopulate();

    res.send(req.customer.orders);
  } catch (e) {
    console.log(e.message);
    res.sendStatus(500);
  }
});

router.get('/boughtList', auth, async (req, res) => {
  try {
    res.send({ boughtList: req.customer.boughtList });
  } catch (e) {
    console.log(e.message);
    res.sendStatus(500);
  }
});

module.exports = router;
