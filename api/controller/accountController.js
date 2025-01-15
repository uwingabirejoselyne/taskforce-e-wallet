const asyncHandler = require("express-async-handler");
const Account = require("../models/accountModel");

// Add a new account
const addAccount = asyncHandler(async (req, res) => {
  const { name,balance } = req.body;
 console.log(name);
 
  const account = await Account.create({
    userId: req.user._id,
    name,
    balance
  });

  res.status(201).json(account);
});



module.exports = { addAccount};
