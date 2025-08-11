// SETUP
const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/verify-token");

const Habit = require("../models/Habit");

// ROUTES

// Protected Routes
router.use(verifyToken);

// Habit Routes

// HabitLog Routes

// EXPORTING ROUTES
module.exports = router;
