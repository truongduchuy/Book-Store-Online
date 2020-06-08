const mongoose = require('mongoose');
const { Schema } = mongoose;
const Order = require('./order');

const BookSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      validate(value) {
        if (value <= 0) throw new Error('price must be a positive number');
      },
    },
    quantity: {
      type: Number,
      required: true,
      validate(value) {
        if (value <= 0) throw new Error('quantity must be a positive number');
      },
    },
    genre: {
      type: Schema.Types.ObjectId,
      ref: 'Genre',
    },
  },
  { versionKey: false, toJSON: { virtuals: true } },
);

// delete all orders that this book exists in
BookSchema.pre('remove', async function (next) {
  const book = this;

  await Order.deleteMany({ 'cart.bookId': book._id });
  console.log('deleted successfully!');
  next();
});

BookSchema.post('save', async function (book, next) {
  await book.populate('genre').execPopulate();
  next();
});

BookSchema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'bookId',
});

const Book = mongoose.model('Book', BookSchema);

module.exports = Book;
