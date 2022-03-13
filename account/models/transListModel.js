const mongoose = require("mongoose");

const transListSchema = mongoose.Schema(
  {
    tr_cancel_date: {
      type: Date,
    },
    tr_contract: {
      type: String,
      required: [true, "Please enter a text value"],
    },
    tr_state: {
      type: String,
      required: [true, "Please enter a text value"],
    },
    tr_start_date: {
      type: Date,
      required: [true, "Please enter a text value"],
    },
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
    bd_id: {
      type: mongoose.Schema.Types.ObjectId,
      //   required: true,
      ref: "Building",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("TransactionList", transListSchema);
