const jwt = require('jsonwebtoken');
const Customer = require('../models/customer');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const customer = await Customer.findOne({ _id: decoded._id });

    if (!customer) throw new Error();
    req.customer = customer;
    next();
  } catch (e) {
    res.status(401).send({ error: 'please authenticate!' });
  }
};

module.exports = auth;
