const mongoose = require('mongoose');
const Book = require('./book');
const { Schema } = mongoose;

const genreSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
  },
  { versionKey: false },
);

genreSchema.pre('remove', async function (next) {
  const genre = this;

  await Book.deleteMany({ genre: genre._id });

  next();
});

const Genre = mongoose.model('Genre', genreSchema);

module.exports = Genre;
