const asyncHandler = require("express-async-handler");
const Transaction = require("../models/transactionModel");
const Account = require("../models/accountModel");
const User = require("../models/userModel");
const Category = require("../models/categoryModel");

// Add a new transaction
const addTransaction = asyncHandler(async (req, res) => {
  try {
    const { type, amount, accountId, categoryId } = req.body;

    // Validate and find the account
    const account = await Account.findById(accountId);
    if (!account) {
      return res.status(404).json({ error: "Account not found" });
    }

    // Handle category validation only for expenses
    let category = null;
    if (type === "expense") {
      if (!categoryId) {
        return res.status(400).json({ error: "Category is required for expense transactions" });
      }

      category = await Category.findById(categoryId);
      if (!category) {
        return res.status(404).json({ error: "Category not found. Please provide a valid category ID." });
      }
    }

    // Create the transaction
    const transaction = await Transaction.create({
      ...req.body,
      userId: req.user._id,
      category: type === "expense" ? categoryId : undefined,
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
          updatedBalance: account.balance,
        });
      }
    }

    res.status(201).json({
      message: "Transaction added successfully",
      transaction,
      updatedBalance: account.balance,
    });
  } catch (error) {
    console.error("Error adding transaction:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Generate report
const generateReport = asyncHandler(async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({ error: "Start date and end date are required" });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start) || isNaN(end)) {
      return res.status(400).json({ error: "Invalid date format" });
    }

    const transactions = await Transaction.find({
      userId: req.user._id,
      date: { $gte: start, $lte: end },
    }).populate("accountId");

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

    res.status(200).json({ summary, transactions });
  } catch (error) {
    console.error("Error generating report:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get all transactions
const getTransactions = asyncHandler(async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user._id }).populate("accountId");
    res.status(200).json(transactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get transaction summary
const getTransactionSummary = asyncHandler(async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user._id });

    const summary = transactions.reduce(
      (acc, transaction) => {
        if (transaction.type === "income") {
          acc.totalIncome += transaction.amount;
        } else if (transaction.type === "expense") {
          acc.totalExpense += transaction.amount;
        }
        return acc;
      },
      { totalIncome: 0, totalExpense: 0 }
    );

    res.status(200).json({ summary, transactions });
  } catch (error) {
    console.error("Error fetching transaction summary:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


module.exports = { addTransaction, getTransactions, generateReport, getTransactionSummary };
