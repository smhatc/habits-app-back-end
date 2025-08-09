// SETUP
const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 12;

const User = require("../models/User");

// ROUTES
router.post("/sign-up", async (req, res) => {
  try {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ error: "Invalid credentials." });
    }
    const hashedPassword = bcrypt.hashSync(password, saltRounds);
    const newUser = await User.create({ username, hashedPassword });
    const payload = {
      username: newUser.username,
      _id: newUser._id,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    res.status(201).json({ token });
  } catch (error) {
    res.status(400).json({ error: "Invalid, please try again." });
  }
});

router.post("/sign-in", async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials." });
    }
    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      user.hashedPassword
    );
    if (!isPasswordCorrect) {
      return res.status(401).json({ error: "Invalid credentials." });
    }
    const payload = {
      username: user.username,
      _id: user._id,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// EXPORTING ROUTES
module.exports = router;
