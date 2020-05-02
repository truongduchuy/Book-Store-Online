const express = require('express');
const router = express.Router();
const Review = require('../models/review');

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
      .limit(Number(size));

    res.send({ total, reviews, bookId: req.params.id });
  } catch (e) {
    console.log(e.message);
    res.status(500).send({ error: 'get reviews failed!' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { rating, reviewer, bookId } = req.body;

    if (!rating || !reviewer || !bookId) {
      res.status(400).send();
    }

    const newReview = new Review(req.body);

    await newReview.save();
    await newReview.populate({ path: 'reviewer', select: 'username' }).execPopulate();

    res.send(newReview);
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
    res.status(500).send({ error: 'get reviews failed!' });
  }
});

module.exports = router;
