const asyncHandler = require("express-async-handler");
const Transaction = require("../models/transactionModel");
const Account = require("../models/accountModel");

// Add a transaction
const addTransaction = asyncHandler(async (req, res) => {
  const { accountId, type, amount, category, description } = req.body;

  const account = await Account.findById(accountId);
  if (!account) {
    res.status(404);
    throw new Error("Account not found");
  }

  const transaction = await Transaction.create({
    userId: req.user._id,
    accountId,
    type,
    amount,
    category,
    description,
  });

  // Update account balance
  account.balance += type === "income" ? amount : -amount;
  await account.save();

  res.status(201).json(transaction);
});


module.exports = { addTransaction };
