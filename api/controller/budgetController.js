const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Transaction = require("../models/transactionModel");

// Set budget for the user
const setBudget = asyncHandler(async (req, res) => {
  try {
    const { budget } = req.body;

    // Validate budget
    if (!budget || budget <= 0) {
      return res.status(400).json({ message: "Invalid budget amount" });
    }

    // Update the user's budget
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { budget },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ 
      message: "Budget updated successfully", 
      budget: user.budget 
    });
  } catch (error) {
    console.error("Error setting budget:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Check budget status
const checkBudget = asyncHandler(async (req, res) => {
  try {
    // Find the user
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Calculate total expenses
    const totalExpenses = await Transaction.aggregate([
      { $match: { userId: user._id.toString(), type: "expense" } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const total = totalExpenses[0]?.total || 0;
    const exceeded = total > user.budget;

    // Respond with budget details
    res.status(200).json({
      exceeded,
      totalExpense: total,
      budget: user.budget,
      message: exceeded
        ? "Budget exceeded!"
        : "You are within your budget",
    });
  } catch (error) {
    console.error("Error checking budget:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = { setBudget, checkBudget };
