const User = require('../models/userModel')
const asyncHandler = require("express-async-handler");

const createUser = asyncHandler(async (req,res)=>{
  const email = req.body.email
  const findUser = await User.findOne({email})
  if (!findUser) {
      const newUser = await User.create(req.body);
      res.status(201).json({
        msg: "User created",
      });
    } else {
      throw new Error("User already exists");
    }

}
)
module.exports = {createUser}