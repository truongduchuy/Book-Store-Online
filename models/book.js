const mongoose = require('mongoose');
const { Schema } = mongoose;

const BookSchema = new Schema({
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
  },
  quantity: {
    type: Number,
    required: true,
  },
  genre: {
    type: Schema.Types.ObjectId,
    ref: 'Genre',
  },
});

// BookSchema.virtual('reviews', {
//   ref: 'Review',
//   localField: '_id',
//   foreignField: 'bookId',
// });

const Book = mongoose.model('Book', BookSchema);

module.exports = Book;
