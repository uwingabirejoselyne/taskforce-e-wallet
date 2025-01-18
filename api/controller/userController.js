const User = require('../models/userModel');
const generateRefreshToken = require("../config/refreshToken");
const { generatedToken } = require("../config/jwtToken");

const createUser = async (req, res) => {
  try {
    const email = req.body.email;
    const findUser = await User.findOne({ email });
    if (!findUser) {
      const newUser = await User.create(req.body);
      res.status(201).json({
        msg: "User created",
      });
    } else {
      res.status(400).json({ msg: "User already exists" });
    }
  } catch (error) {
    res.status(500).json({ msg: "An error occurred", error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const findUser = await User.findOne({ email });
    if (findUser && (await findUser.isPasswordMatched(password))) {
      const refreshToken = await generateRefreshToken(findUser._id); 
      await User.findByIdAndUpdate(
        findUser.id,
        {
          refreshToken: refreshToken,
        },
        { new: true }
      );
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 72 * 60 * 60 * 1000,
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
      res.status(401).json({ msg: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ msg: "An error occurred", error: error.message });
  }
};

module.exports = { createUser, loginUser };
