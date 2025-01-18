const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const authMiddleware = asyncHandler(async (req, res, next) => {
  let token;

  if (req?.headers?.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
    
    try {
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded?.id);

        if (!user) {
          return res.status(401).json({ message: "User not found, unauthorized" });
        }

        req.user = user;
        return next();
      }
    } catch (error) {
      return res.status(401).json({ message: "Invalid or expired token, please log in again" });
    }
  }

  // If no token is provided or header format is invalid
  return res.status(401).json({ message: "Authorization header missing or invalid" });
});

const isUser = async (req, res, next) => {
  const { email } = req.user;

  try {
    const standardUser = await User.findOne({ email });
    if (!standardUser || standardUser.standard !== "user") {
      return res.status(403).json({ message: "You are not authorized as a user" });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { authMiddleware, isUser };
