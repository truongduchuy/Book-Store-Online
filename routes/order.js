const express = require('express');
const router = express.Router();
const Order = require('../models/order');
const Genre = require('../models/genre');
const Customer = require('../models/customer');
const Book = require('../models/book');
const mongoose = require('mongoose');

const ONE_DAY_IN_MILISECONDS = 1000 * 60 * 60 * 24;

const dateInBetweenTwoDates = (orderedDate, startDate, endDate) =>
  orderedDate >= new Date(startDate) &&
  orderedDate <= new Date(new Date(endDate).getTime() + ONE_DAY_IN_MILISECONDS);

router.get('/statistics', async (req, res) => {
  try {
    const { startDate, endDate, genreId } = req.query;

    let aggregateArray = [
      {
        $lookup: {
          from: 'books',
          localField: '_id',
          foreignField: 'genre',
          as: 'books',
        },
      },
      {
        $lookup: {
          from: 'orders',
          localField: 'cart.bookId',
          foreignField: 'books._id',
          as: 'orders',
        },
      },
    ];

    if (genreId && genreId !== 'All') {
      aggregateArray.unshift({
        $match: {
          _id: {
            $eq: mongoose.Types.ObjectId(genreId),
          },
        },
      });
    }

    const genres = await Genre.aggregate(aggregateArray);

    const allOrders = genres[0] && genres[0].orders;
    const newGenres = genres
      .filter(genre => genre.books.length > 0)
      .map(({ orders, ...resData }) => resData);

    const orders = allOrders.filter(({ createdAt }) =>
      dateInBetweenTwoDates(createdAt, startDate, endDate),
    );

    const carts = orders.reduce((acc, item) => [...acc, ...item.cart], []);

    const soldCounter = {}; // { bookId: sold}
    carts.forEach(({ bookId, quantity: sold }) => {
      soldCounter[bookId] = (soldCounter[bookId] || 0) + sold;
    });

    let records = [];
    newGenres.forEach(({ name, books }) => {
      books.forEach(book => {
        if (soldCounter[book._id]) {
          records.push({ ...book, genreName: name, sold: soldCounter[book._id] });
        }
      });
    });

    res.send(records.sort((a, b) => b.sold - a.sold));
  } catch (e) {
    console.log(e.message);
    res.status(500).send({ error: 'delete book failed!' });
  }
});

router.get('/', async (req, res) => {
  try {
    const { page, size } = req.query;

    const total = await Order.countDocuments({});
    const orders = await Order.find({})
      .skip((page - 1) * Number(size))
      .limit(Number(size))
      .sort({ createdAt: -1 })
      .populate({ path: 'customer.customerInfo', select: { password: 0 } })
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
