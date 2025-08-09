// SETUP
const mongoose = require("mongoose");

// SCHEMAS
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    hashedPassword: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    delete returnedObject.hashedPassword;
  },
});

// MODELS
const User = mongoose.model("User", userSchema);

// EXPORTING MODELS
module.exports = User;
