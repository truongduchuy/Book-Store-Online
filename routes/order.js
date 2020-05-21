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

    const newGenres = genres.filter(genre => genre.books.length > 0);

    const records = newGenres.map(genre => {
      const soldListCounter = {};

      genre.orders
        .filter(({ createdAt }) => dateInBetweenTwoDates(createdAt, startDate, endDate))
        .forEach(order =>
          order.cart.forEach(({ bookId, quantity }) => {
            soldListCounter[bookId] = (soldListCounter[bookId] || 0) + quantity;
          }),
        );
      //console.log(soldListCounter);
      //{'5eae8d0491c77018cc8713e5': 2}

      let record = {};
      for (let [bookId, sold] of Object.entries(soldListCounter)) {
        genre.books.forEach(book => {
          if (book._id == bookId) record = { ...book, genreName: genre.name, sold };
        });
      }
      return record;
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
