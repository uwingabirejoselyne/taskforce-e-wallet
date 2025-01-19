const asyncHandler = require("express-async-handler");
const Account = require("../models/accountModel");

const addAccount = asyncHandler(async (req, res) => {
  try {
    const { name, balance } = req.body;

    // Ensure name and balance are provided
    if (!name || balance === undefined) {
      return res.status(400).json({ message: "Name and balance are required." });
    }

    // Create a new account
    const account = await Account.create({
      userId: req.user._id,
      name,
      balance
    });

    res.status(201).json(account);
  } catch (error) {
    console.error("Error adding account:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = { addAccount };
