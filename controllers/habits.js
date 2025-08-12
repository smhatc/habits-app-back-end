// SETUP
const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/verify-token");

const Habit = require("../models/Habit");

// PROTECTED ROUTES
router.use(verifyToken);

// Habit Routes
// Create One
router.post("/", async (req, res) => {
  try {
    req.body.habitOwner = req.user._id;
    const habit = await Habit.create(req.body);
    habit._doc.habitOwner = req.user;
    res.status(201).json(habit);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// Read All
router.get("/", async (req, res) => {
  try {
    let habits;
    const searchQuery = req.query.search
      ? req.query.search.toLowerCase()
      : null;
    const allHabits = await Habit.find({ habitOwner: req.user._id });
    if (searchQuery) {
      habits = allHabits.filter(
        (habit) =>
          habit.habitName.toLowerCase().includes(searchQuery) ||
          habit.habitDescription.toLowerCase().includes(searchQuery)
      );
      if (habits.length === 0) {
        return res.status(404).json({
          error: "No habits match the search criteria.",
        });
      }
    } else {
      habits = [...allHabits];
    }
    res.status(200).json(habits);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// Read One
router.get("/:habitId", async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.habitId);
    res.status(200).json(habit);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// Update One
router.put("/:habitId", async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.habitId);

    if (!habit.habitOwner.equals(req.user._id)) {
      return res.status(403).send("You're not allowed to do that.");
    }

    const updatedHabit = await Habit.findByIdAndUpdate(
      req.params.habitId,
      req.body,
      { new: true }
    );

    updatedHabit._doc.habitOwner = req.user;

    res.status(200).json(updatedHabit);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// Delete One
router.delete("/:habitId", async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.habitId);

    if (!habit.habitOwner.equals(req.user._id)) {
      return res.status(403).send("You're not allowed to do that.");
    }

    const deletedHabit = await Habit.findByIdAndDelete(req.params.habitId);

    res.status(200).json(deletedHabit);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// HabitLog Routes
// Create One
router.post("/:habitId/logs", async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.habitId);
    habit.habitLog.push({});
    await habit.save();

    const newHabitLog = habit.habitLog[habit.habitLog.length - 1];

    res.status(201).json(newHabitLog);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// EXPORTING ROUTES
module.exports = router;
