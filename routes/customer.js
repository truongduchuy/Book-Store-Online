const express = require('express');
const Customer = require('../models/customer');
const Order = require('../models/order');
const router = express.Router();

const mockCustomer = {
  email: 'huy123@gmail.com',
  password: 'huy123',
  username: 'huyitto',
  phoneNumber: '0123123123',
  address: 'Hue',
};

const mockCart = ['5ea902024bc8b717b4e80241', '5ea90e7e14adc822f8367515'];

const mockCart2 = ['5ea8e6d54d788c2f5c567ac2', '5ea8f6b3e9b7f52aec0869a5'];

router.get('/', async (req, res) => {
  // tạo 1 customer
  // tạo 2 order với customerId, cart: [ bookId ]
  // get 1 list những order trong đó, bao gồm cart details
  try {
    const newCustomer = new Customer(mockCustomer);
    const customerId = await newCustomer.save().then(customer => customer._id);

    const newOrder = new Order({
      customer: customerId,
      cart: mockCart,
    });
    await newOrder.save();

    const newOrder2 = new Order({
      customer: customerId,
      cart: mockCart2,
    });
    await newOrder2.save();

    const orders = await Order.find({ customer: customerId })
      .select('-customer')
      .populate({
        path: 'cart',
        select: '-description',
        populate: {
          path: 'genre',
          select: 'name -_id',
        },
      })
      .exec();

    console.log(orders);

    res.send(orders);
  } catch (e) {
    console.log(e.message);
    res.status(500).send();
  }
});

module.exports = router;
