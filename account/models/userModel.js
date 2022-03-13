const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  u_username: {
    type: String,
    required: [true, "Please enter a username"],
  },
  u_email: {
    type: String,
    required: [true, "Please enter a email"],
  },
  u_name: {
    type: String,
    required: [true, "Please enter a name"],
  },
  u_bankactname: {
    type: String,
  },
  u_password: {
    type: String,
    required: [true, "Please enter a password"],
  },
  u_bankactid: {
    type: String,
  },
  u_surname: {
    type: String,
    required: [true, "Please enter a surname"],
  },
  u_phonenum: {
    type: String,
    required: [true, "Please enter a phone number"],
  },
  u_idcard: {
    type: String,
    required: [true, "Please enter a id card"],
  },
});

module.exports = mongoose.model("User", userSchema);
