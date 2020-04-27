const express = require('express');
const router = express.Router();
const Book = require('../models/book');
const upload = require('../config/multer');
const cloudinary = require('cloudinary').v2;

router.get('/', async (req, res) => {
  try {
    const books = await Book.find({});

    res.send({
      total: books.length,
      books,
    });
  } catch (e) {
    console.log(e.message);
    res.status(500).send({ error: 'something wen wrong!' });
  }
});

router.post(
  '/',
  upload.single('image'),
  async (req, res) => {
    try {
      const { title, description, price, genre } = req.body;

      if (!title || !description || !price || !genre) {
        res.status(400).json({ error: 'Bad request!' });
      }

      const book = await Book.findOne({ title });

      if (book) res.status(400).json({ error: 'book is existed!' });

      const imageUrl = await cloudinary.uploader
        .upload(req.file.path)
        .then(result => result.secure_url)
        .catch(e => res.send(500).send({ error: 'Upload failed!' }));

      const newBook = new Book({
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
      res.status(500).send({ error: 'Something went wrong!' });
    }
  },
  (error, req, res, next) => {
    console.log(error.message);
    res.status(400).send({ error: error.message });
  },
);

// router.patch('/:id', (req, res) => {});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await Book.deleteOne({ _id: id });
    res.send({ success: true });
  } catch (e) {
    console.log(e.message);
    res.status(500).send({ error: 'delete book failed!' });
  }
});

module.exports = router;
