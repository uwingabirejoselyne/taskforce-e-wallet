const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Transaction = require("../models/transactionModel");

// Set budget for the user
const setBudget = asyncHandler(async (req, res) => {
  const { budget } = req.body;

  if (!budget || budget <= 0) {
    res.status(400);
    throw new Error("Invalid budget amount");
  }

  const user = await User.findByIdAndUpdate(
    req.user._id,
    { budget },
    { new: true }
  );

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  res.status(200).json({ message: "Budget updated successfully", budget: user.budget });
});

const checkBudget = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const totalExpenses = await Transaction.aggregate([
    { $match: { userId: user._id, type: "expense" } },
    { $group: { _id: null, total: { $sum: "$amount" } } },
  ]);

  const total = totalExpenses[0]?.total || 0;

  const exceeded = total > user.budget;
  res.status(200).json({
    exceeded,
    totalExpense: total,
    budget: user.budget,
    message: exceeded
      ? "Budget exceeded!"
      : "You are within your budget",
  });
});

module.exports = { setBudget,checkBudget};
