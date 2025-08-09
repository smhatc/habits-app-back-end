// SETUP
const jwt = require("jsonwebtoken");

// verifyToken MIDDLEWARE
const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log(decoded);
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token." });
  }
};

// EXPORTING verifyToken MIDDLEWARE
module.exports = verifyToken;
