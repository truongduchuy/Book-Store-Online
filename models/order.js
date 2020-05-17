const mongoose = require('mongoose');
const { Schema } = mongoose;

const OrderSchema = new Schema(
  {
    customer: {
      customerInfo: {
        type: Schema.Types.ObjectId,
        ref: 'Customer',
      },
      address: {
        type: String,
      },
      phoneNumber: {
        type: String,
      },
    },
    cart: [
      {
        bookId: {
          type: Schema.Types.ObjectId,
          ref: 'Book',
        },
        quantity: Number,
      },
    ],
    status: {
      type: String,
      default: 'Progressing',
    },
  },
  { timestamps: true, versionKey: false },
);

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;
