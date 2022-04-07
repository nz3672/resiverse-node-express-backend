const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const { upload } = require("../controllers/imgController");
const formidable = require("formidable");

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
  const form = new formidable.IncomingForm().parse(req);
  let userPassword = "";

  form.on("field", function (field, value) {
    if (field === "u_password") {
      userPassword = value;
    }
  });

  // upload img to aws s3
  const imgProfile = upload.any("u_profileImg");

  imgProfile(req, res, async (err) => {
    if (!req.body) {
      res.status(400);
      throw new Error("Please add a text field");
    }

    // Check if User exist
    const userExists = await User.findOne({ u_email: req.body.u_email });

    if (userExists) {
      res.status(400);
      throw new Error("User already exist");
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userPassword, salt);
    //Create user
    const user = await User.create({
      u_username: req.body.u_username,
      u_email: req.body.u_email,
      u_name: req.body.u_name,
      u_bankactname: req.body.u_bankactname,
      u_password: hashedPassword,
      u_bankactid: req.body.u_bankactid,
      u_surname: req.body.u_surname,
      u_phonenum: req.body.u_phonenum,
      u_idcard: req.body.u_idcard,
      u_profileImg: req.files[0].location,
    });

    if (user) {
      res.status(201).json({
        _id: user.id,
        user: user,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid User data");
    }
  });
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
  const form = new formidable.IncomingForm().parse(req);
  let userPassword = "";
  let userProfileImg = "";
  form.on("field", function (field, value) {
    // console.log(field, value);
    if (field === "u_password") {
      userPassword = value;
    }
  });
  form.on("file", function (field, value) {
    if (field === "u_profileImg") {
      userProfileImg = value;
    }
  });
  console.log(userProfileImg);
  const imgProfile = upload.any("u_profileImg");
  imgProfile(req, res, async (err) => {
    if (userProfileImg) {
      req.body.u_profileImg = req.files[0].location;
    }
    if (userPassword) {
      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(userPassword, salt);
      req.body.u_password = hashedPassword;
    }
    const user = await User.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
    });
    res.status(200).json(user);
  });
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
