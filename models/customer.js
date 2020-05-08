const mongoose = require('mongoose');
const validator = require('validator');
const { Schema } = mongoose;
const bcrypt = require('bcryptjs');

const CustomerSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) throw new Error('Email is invalid!');
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 6,
      validate(value) {
        if (value.toLowerCase().includes('password')) {
          throw new Error('Password cannot contain "password"');
        }
      },
    },
    username: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  { versionKey: false },
);

CustomerSchema.virtual('orders', {
  ref: 'Order',
  localField: '_id',
  foreignField: 'customer',
});

// schema method
CustomerSchema.statics.findByCredentials = async (email, password) => {
  const customer = await Customer.findOne({ email });

  if (!customer) throw new Error('Not found');

  const isMatch = await bcrypt.compare(password, customer.password);

  if (!isMatch) throw new Error('password is incorrect!');

  return customer;
};

const Customer = mongoose.model('Customer', CustomerSchema);

module.exports = Customer;
