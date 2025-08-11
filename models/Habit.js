// SETUP
const mongoose = require("mongoose");

// SCHEMAS
const habitLogSchema = new mongoose.Schema({}, { timestamps: true });

const habitSchema = new mongoose.Schema(
  {
    habitOwner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    habitName: {
      type: String,
      required: true,
      trim: true,
    },

    habitDescription: {
      type: String,
      required: true,
      trim: true,
    },

    habitFrequency: {
      type: String,
      required: true,
      enum: ["Daily", "Weekly", "Monthly"],
    },
    habitLog: [habitLogSchema],
  },
  { timestamps: true }
);

// MODELS
const Habit = mongoose.model("Habit", habitSchema);

// EXPORTING MODELS
module.exports = Habit;
