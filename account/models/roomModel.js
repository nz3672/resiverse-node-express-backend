const mongoose = require("mongoose");

const roomSchema = mongoose.Schema({
  ro_state: {
    type: String,
    required: [true, "Please enter a state"],
  },
  ro_cert: {
    type: String,
    required: [true, "Please enter a certification"],
  },
  ro_address: {
    type: String,
    required: [true, "Please enter a address"],
  },
  ro_size: {
    type: String,
    required: [true, "Please enter a size"],
  },
  ro_desc: {
    type: String,
    required: [true, "Please enter a description"],
  },
  bd_id: {
    type: mongoose.Schema.Types.ObjectId,
    // required: true,
    ref: "Building",
  },
});

module.exports = mongoose.model("Room", roomSchema);
