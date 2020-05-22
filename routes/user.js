const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');

router.get('/', async (req, res) => {
  try {
    const users = await User.find({});

    res.send(users);
  } catch (e) {
    console.log(e.message);
    res.sendStatus(500);
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) res.status(400).send();

    const user = await User.findOne({ email });
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) res.status(400).send();

    res.send(user);
  } catch (e) {
    console.log(e.message);
    res.sendStatus(500);
  }
});

router.post('/', async (req, res) => {
  try {
    const { email, name, password } = req.body;

    if (!email || !name || !password) res.status(400).send();

    const user = new User({
      email,
      name,
      password: await bcrypt.hash(password, 8),
    });

    await user.save();

    res.send(user);
  } catch (e) {
    console.log(e.message);
    res.sendStatus(500);
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const { email, name, password } = req.body;

    if (!email || !name) res.status(400).send();

    const user = await User.findOne({ _id: req.params.id });

    if (!user) res.status(404).send();
    if (password) user.password = await bcrypt.hash(password, 8);
    user.email = email;
    user.name = name;
    await user.save();

    res.send({ success: true });
  } catch (e) {
    console.log(e.message);
    res.sendStatus(500);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await User.deleteOne({ _id: req.params.id });

    res.send({ success: true });
  } catch (e) {
    console.log(e.message);
    res.sendStatus(500);
  }
});

module.exports = router;
