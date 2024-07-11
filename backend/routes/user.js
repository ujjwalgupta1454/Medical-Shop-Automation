const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Sign Up Route
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = new User({ name, email, password });
    await newUser.save();
    res.status(201).send('User registered successfully');
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Sign In Route
router.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(401).send('Invalid email or password');
    }
    res.status(200).send('Sign in successful');
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = router;
