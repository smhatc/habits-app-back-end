// SETUP
const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();
const port = process.env.PORT ? process.env.PORT : "3000";

const logger = require("morgan");
const cors = require("cors");
const verifyToken = require("./middleware/verify-token");

const testJwtController = require("./controllers/test-jwt");
const authController = require("./controllers/auth");
const usersController = require("./controllers/users");

const mongoose = require("mongoose");

// DATABASE CONNECTION
mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

// MIDDLEWARE
app.use(logger("dev"));
app.use(cors());
app.use(express.json());

// PUBLIC ROUTES
app.use("/test-jwt", testJwtController);
app.use("/auth", authController);

// PROTECTED ROUTES
app.use(verifyToken);
app.use("/users", usersController);

// STARTING THE SERVER
app.listen(port, () => {
  console.log(`Server is listening on port ${port}.`);
});
