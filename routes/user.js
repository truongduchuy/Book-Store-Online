const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.post('/users', async (req, res) => {
  try {
    const user = new User(req.body);

    await user.save();

    res.send(user);
  } catch (e) {
    console.log(e.message);
    res.sendStatus(500);
  }
});

module.exports = router;
