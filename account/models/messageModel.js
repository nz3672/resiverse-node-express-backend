const mongoose = require("mongoose");

const messageSchema = mongoose.Schema(
  {
    msg_message: {
      type: String,
      required: [true, "Please enter a text value"],
    },
    msg_sender_id: {
      type: String,
      required: [true, "Please enter a text value"],
    },
    cr_id: {
      type: mongoose.Schema.Types.ObjectId,
      //   required: true,
      ref: "Chatroom",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Message", messageSchema);
