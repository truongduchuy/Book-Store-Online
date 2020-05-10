const express = require('express');
const router = express.Router();
const Order = require('../models/order');

router.get('/', async (req, res) => {
  try {
    const { page, size } = req.query;

    const total = await Order.countDocuments({});
    const orders = await Order.find({})
      .skip((page - 1) * Number(size))
      .limit(Number(size))
      .sort({ createdAt: -1 })
      .populate({ path: 'customer', select: { password: 0 } })
      .populate({ path: 'cart.bookId', select: { genre: 0 } });

    res.send({ orders, total });
  } catch (e) {
    console.log(e.message);
    res.sendStatus(500);
  }
});

router.patch('/', async (req, res) => {
  try {
    const { status, id } = req.body;
    const order = await Order.findOne({ _id: id });

    order.status = status;

    await order.save();

    res.send({ success: true });
  } catch (e) {
    console.log(e.message);
    res.sendStatus(500);
  }
});
module.exports = router;
