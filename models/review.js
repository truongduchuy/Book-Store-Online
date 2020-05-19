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
    rate: {
      type: Number,
      required: true,
      validate(value) {
        if (value < 0 && value > 5) throw new Error('rating must be between 0 and 5');
      },
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
    versionKey: false,
  },
);

const Review = mongoose.model('Review', ReviewSchema);

module.exports = Review;
