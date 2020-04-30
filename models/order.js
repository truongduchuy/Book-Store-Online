const mongoose = require('mongoose');
const { Schema } = mongoose;

const OrderSchema = new Schema(
  {
    customer: {
      type: Schema.Types.ObjectId,
      ref: 'Customer',
    },
    cart: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Book',
      },
    ],
  },
  { timestamps: true },
);

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;
