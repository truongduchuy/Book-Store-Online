const express = require('express');
const router = express.Router();
const Book = require('../models/book');
const upload = require('../config/multer');
const cloudinary = require('cloudinary').v2;
const isOperationValid = require('./utils/checkOperationValid');

router.get('/', async (req, res) => {
  try {
    const { genreId, searchValue, page, size } = req.query;

    const filterObj = {};

    if (searchValue) filterObj['title'] = { $regex: searchValue, $options: 'i' };

    if (genreId) filterObj['genre'] = genreId;

    const total = await Book.countDocuments(filterObj);

    const books = await Book.find(filterObj)
      .skip((page - 1) * Number(size))
      .limit(Number(size))
      .populate({
        path: 'genre',
      })
      .exec();

    res.send({
      total,
      data: books,
    });
  } catch (e) {
    console.log(e.message);
    res.status(500).send({ error: 'get books failed!' });
  }
});

router.get('/:title', async (req, res) => {
  try {
    const { title } = req.params;

    const book = await Book.findOne({ title }).populate({
      path: 'reviews',
      options: {
        sort: { createdAt: -1 },
      },
      populate: {
        path: 'reviewer',
        select: 'username',
      },
    });

    res.send(book);
  } catch (e) {
    console.log(e.message);
    res.status(500).send({ error: 'get books failed!' });
  }
});

router.post(
  '/',
  upload.single('image'),
  async (req, res) => {
    try {
      const { title, description, price, genre, quantity } = req.body;

      if (!title || !description || !price || !genre || !quantity) {
        res.status(400).json({ error: 'Bad request!' });
      }

      const book = await Book.findOne({ title });

      if (book) res.status(400).json({ error: 'book is existed!' });

      const imageUrl = await cloudinary.uploader
        .upload(req.file.path)
        .then(result => result.secure_url)
        .catch(e => res.send(500).send({ error: 'Upload failed!' }));

      const newBook = new Book({
        quantity,
        title,
        description,
        price,
        genre,
        imageUrl,
      });

      await newBook.save();

      res.send(newBook);
    } catch (e) {
      console.log(e.message);
      res.status(500).send({ error: 'create book failed!' });
    }
  },
  (error, req, res, next) => {
    console.log(error.message);
    res.status(400).send({ error: error.message });
  },
);

router.patch(
  '/:id',
  upload.single('image'),
  async (req, res) => {
    try {
      const { body } = req;

      const updates = Object.keys(body);
      const allowedUpdates = ['title', 'description', 'price', 'genre', 'quantity'];

      if (!isOperationValid(updates, allowedUpdates)) {
        res.status(400).json({ error: 'Bad request!' });
      }

      // check if book is exist
      const _id = req.params.id;
      const book = await Book.findOne({ _id });

      if (!book) {
        return res.status(404).send();
      }

      updates.forEach(update => (book[update] = body[update]));

      if (req.file) {
        const imageUrl = await cloudinary.uploader
          .upload(req.file.path)
          .then(result => result.secure_url)
          .catch(e => res.send(500).send({ error: 'Upload failed!' }));

        book['imageUrl'] = imageUrl;
      }

      await book.save();

      res.send(book);
    } catch (e) {
      console.log(e.message);
      res.status(500).send({ error: 'update book failed!' });
    }
  },
  (error, req, res, next) => {
    console.log(error.message);
    res.status(400).send({ error: error.message });
  },
);

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const book = await Book.findOne({ _id: id });
    await book.remove();

    res.send({ success: true });
  } catch (e) {
    console.log(e.message);
    res.status(500).send({ error: 'delete book failed!' });
  }
});

module.exports = router;
