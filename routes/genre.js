const express = require('express');
const router = express.Router();
const Genre = require('../models/genre');

router.get('/', async (req, res) => {
  try {
    const genres = await Genre.find({});

    res.send(genres);
  } catch (e) {
    console.log(e.message);
    res.sendStatus(500);
  }
});

router.post('/', async (req, res) => {
  try {
    const genre = new Genre(req.body);

    await genre.save();

    res.send(genre);
  } catch (e) {
    console.log(e.message);
    res.sendStatus(500);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const genre = await Genre.findOne({ _id: req.params.id });
    await genre.remove();
    res.sendStatus(200);
  } catch (e) {
    console.log(e.message);
    res.sendStatus(500);
  }
});

router.patch('/:id', async (req, res) => {
  try {
    await Genre.updateOne({ _id: req.params.id }, req.body);

    res.sendStatus(200);
  } catch (e) {
    console.log(e.message);
    res.sendStatus(500);
  }
});

module.exports = router;
