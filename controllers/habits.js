// SETUP
const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/verify-token");

const Habit = require("../models/Habit");

// ROUTES

// Protected Routes
router.use(verifyToken);

// Habit Routes
router.get("/", async (req, res) => {
  try {
    const habits = await Habit.find({});
    res.status(200).json(habits);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.get("/:habitId", async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.habitId);
    res.status(200).json(habit);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// HabitLog Routes

// EXPORTING ROUTES
module.exports = router;
