const asyncHandler = require("express-async-handler");
const Transaction = require("../models/transactionModel");
const Account = require("../models/accountModel");
const User = require("../models/userModel");
const Category = require("../models/categoryModel")

// Add a transaction
// const addTransaction = asyncHandler(async (req, res) => {
//   const { accountId, type, amount, category, description } = req.body;

//   const account = await Account.findById(accountId);
  
//   if (!account) {
//     res.status(404);
//     throw new Error("Account not found");
//   }

//   const transaction = await Transaction.create({
//     userId: req.user._id,
//     accountId,
//     type,
//     amount,
//     category,
//     description,
//   });

//   // Update account balance
//   account.balance += type === "income" ? amount : -amount;
//   await account.save();

//   res.status(201).json(transaction);
// });

const addTransaction = asyncHandler(async (req, res) => {
  const { type, amount, accountId, categoryId } = req.body;

  // Validate and find the account
  const account = await Account.findById(accountId);
  if (!account) {
    res.status(404);
    throw new Error("Account not found");
  }

  // Handle category validation only for expenses
  let category = null;
  if (type === "expense") {
    if (!categoryId) {
      res.status(400);
      return res.json({ error: "Category is required for expense transactions" });
    }

    try {
      category = await Category.findById(categoryId);
      if (!category) {
        res.status(404);
        return res.json({ error: "Category not found. Please provide a valid category ID." });
      }
    } catch (error) {
      res.status(400);
      return res.json({ error: "Invalid category ID format. Please provide a valid ObjectId." });
    }
  }

  // Create the transaction
  const transaction = await Transaction.create({
    ...req.body,
    userId: req.user._id,
    category: type === "expense" ? categoryId : undefined, // Link category only for expenses
  });

  // Update account balance
  account.balance += type === "income" ? amount : -amount;
  await account.save();

  // Check if the budget is exceeded for expenses
  if (type === "expense") {
    const user = await User.findById(req.user._id);
    const totalExpenses = await Transaction.aggregate([
      { $match: { userId: user._id.toString(), type: "expense" } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const total = totalExpenses[0]?.total || 0;
    if (total > user.budget) {
      return res.status(201).json({
        message: "Transaction added, but budget exceeded!",
        transaction,
        exceeded: true,
        updatedBalance: account.balance, // Optional: Include updated balance in response
      });
    }
  }

  res.status(201).json({
    message: "Transaction added successfully",
    transaction,
    updatedBalance: account.balance, // Optional: Include updated balance in response
  });
});





const generateReport = asyncHandler(async (req, res) => {
    const { startDate, endDate } = req.query;
  
    // Validate date inputs
    if (!startDate || !endDate) {
      res.status(400);
      throw new Error("Start date and end date are required");
    }
  
    const start = new Date(startDate);
    const end = new Date(endDate);
  
    if (isNaN(start) || isNaN(end)) {
      res.status(400);
      throw new Error("Invalid date format");
    }
  
    // Filter transactions by date range and user
    const transactions = await Transaction.find({
      userId: req.user._id,
      date: {
        $gte: start,
        $lte: end,
      },
    }).populate("accountId");
  
    // Summarize income and expenses
    const summary = transactions.reduce(
      (acc, transaction) => {
        if (transaction.type === "income") {
          acc.totalIncome += transaction.amount;
        } else {
          acc.totalExpense += transaction.amount;
        }
        return acc;
      },
      { totalIncome: 0, totalExpense: 0 }
    );
  
    res.status(200).json({
      summary,
      transactions,
    });
  });

const getTransactions = asyncHandler(async (req, res) => {
    const transactions = await Transaction.find({ userId: req.user._id }).populate("accountId");
    res.status(200).json(transactions);
  });

module.exports = { addTransaction,getTransactions,generateReport };
