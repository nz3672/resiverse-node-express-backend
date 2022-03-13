const mongoose = require("mongoose");

const chatRoomSchema = mongoose.Schema({
  u_id1: {
    type: mongoose.Schema.Types.ObjectId,
    //   required: true,
    ref: "User",
  },
  u_id2: {
    type: mongoose.Schema.Types.ObjectId,
    //   required: true,
    ref: "User",
  },
});

module.exports = mongoose.model("Chatroom", chatRoomSchema);
