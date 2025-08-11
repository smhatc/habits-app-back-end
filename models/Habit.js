const mongoose = require("mongoose");


const habitSchema = new mongoose.Schema({
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
  habitLog: [habitLog],
});

