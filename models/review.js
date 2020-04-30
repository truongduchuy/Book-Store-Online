const mongoose = require('mongoose');
const { Schema } = mongoose;

const ReviewSchema = new Schema(
  {
    heading: {
      type: String,
      trim: true,
    },
    body: {
      type: String,
    },
    rating: {
      type: Number,
    },
    reviewer: {
      type: Schema.Types.ObjectId,
      ref: 'Customer',
    },
    bookId: {
      type: Schema.Types.ObjectId,
      ref: 'Book',
    },
  },
  {
    timestamps: true,
  },
);

const Review = mongoose.model('Review', ReviewSchema);

module.exports = Review;
