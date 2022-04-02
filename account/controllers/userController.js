const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const { use } = require("../routes/buildingRoutes");

// @desc Get User
// @router GET /api/users
// @access Private
const getUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Get User" });
});

// @desc Get User
// @router GET /api/users/me
// @access Private
const getMe = asyncHandler(async (req, res) => {
  const response = await User.findById(req.user.id);

  res.status(200).json(response);
});

// @desc Register User
// @router POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const {
    u_username,
    u_email,
    u_name,
    u_bankactname,
    u_password,
    u_bankactid,
    u_surname,
    u_phonenum,
    u_idcard,
  } = req.body;
  if (!req.body) {
    res.status(400);
    throw new Error("Please add a text feild");
  }

  // Check if User exist
  const userExists = await User.findOne({ u_email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exist");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(u_password, salt);

  //Create user
  const user = await User.create({
    u_username,
    u_email,
    u_name,
    u_bankactname,
    u_password: hashedPassword,
    u_bankactid,
    u_surname,
    u_phonenum,
    u_idcard,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid User data");
  }
});

// @desc Login User
// @router POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  const { u_email, u_password } = req.body;

  //Check for User
  const user = await User.findOne({ u_email });

  if (user && (await bcrypt.compare(u_password, user.u_password))) {
    res.json({
      _id: user.id,
      user: user,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Email or password");
  }
});

// @desc Update User
// @router PUT /api/users
// @access Private
const updateUser = asyncHandler(async (req, res) => {
  const condition = { _id: req.params.id };
  const update = req.body;
  const { u_password } = req.body;

  if (u_password !== undefined) {
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(u_password, salt);
    update.u_password = hashedPassword;
  }

  const user = await User.findOneAndUpdate(condition, update, { new: true });
  res.status(200).json(user);
});

// @desc Delete User
// @router DELETE /api/users
// @access Private
const deleteUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Delete user ${req.params.id}` });
});

//Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

const getOtherUserById = asyncHandler(async (req, res) => {
  const { u_name, u_email, u_username } = await User.findById(req.params.id);

  res.status(200).json({
    u_name: u_name,
    u_email: u_email,
    u_username: u_username,
  });
});
module.exports = {
  getUser,
  registerUser,
  updateUser,
  deleteUser,
  loginUser,
  getMe,
  getOtherUserById,
};
