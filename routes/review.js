const express = require('express');
const router = express.Router();
const Review = require('../models/review');
const auth = require('../middleware/authCustomer');

router.get('/:id', async (req, res) => {
  try {
    const { page, size } = req.query;
    const query = { bookId: req.params.id };

    const total = await Review.countDocuments(query);
    const reviews = await Review.find(query)
      .populate({
        path: 'reviewer',
        select: 'username',
      })
      .skip((page - 1) * size)
      .limit(Number(size))
      .sort({ createdAt: -1 });

    res.send({ total, reviews, bookId: req.params.id });
  } catch (e) {
    console.log(e.message);
    res.status(500).send({ error: 'get reviews failed!' });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const { heading, body, rate, bookId } = req.body;

    if (!heading || !body || !rate || !bookId) {
      res.status(400).send();
    }

    const newReview = new Review({
      heading,
      body,
      rate,
      bookId,
      reviewer: req.customer._id,
    });

    await newReview.save();
    await newReview.populate({ path: 'reviewer', select: 'username' }).execPopulate();

    res.send(newReview);
  } catch (e) {
    console.log(e.message);
    res.status(500).send({ error: 'add review failed!' });
  }
});

router.patch('/:id', auth, async (req, res) => {
  try {
    const { heading, body, rate } = req.body;

    if (!heading || !body || !rate) {
      res.status(400).send();
    }

    await Review.updateOne({ _id: req.params.id }, req.body);

    res.send({ success: true });
  } catch (e) {
    console.log(e.message);
    res.status(500).send({ error: 'add review failed!' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const review = await Review.findOne({ _id: req.params.id });
    await review.remove();
    res.send({ success: true });
  } catch (e) {
    console.log(e.message);
    res.status(500).send({ error: 'delete reviews failed!' });
  }
});

module.exports = router;
