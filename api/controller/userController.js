const User = require('../models/userModel')
const asyncHandler = require("express-async-handler");
const generateRefreshToken  = require("../config/refreshToken");
const { generatedToken } = require("../config/jwtToken");

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

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const findUser = await User.findOne({ email });
    if (findUser && (await findUser.isPasswordMatched(password))) {
      const refreshToken = await generateRefreshToken(findUser._id); 
      const updateUser = await User.findByIdAndUpdate(
        findUser.id,
        {
          refreshToken: refreshToken,
        },
        { new: true }
      );
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 72 * 60 * 60 * 1000
      });
      res.json({
        _id: findUser?._id,
        firstname: findUser?.firstname,
        lastname: findUser?.lastname,
        email: findUser?.email,
        password: findUser?.password,
        token: generatedToken(findUser?._id),
      });
    } else {
      throw new Error("invalid credentials");
    }
  })
module.exports = {createUser,loginUser}