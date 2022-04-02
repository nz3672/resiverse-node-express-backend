const mongoose = require("mongoose");

const transListSchema = mongoose.Schema(
  {
    tr_cancel_date: {
      type: Date,
    },
    tr_contract: {
      type: String,
    },
    tr_state: {
      type: String,
      required: [true, "Please enter a text value"],
    },
    tr_start_date: {
      type: Date,
      required: [true, "Please enter a text value"],
    },
    tenant_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    landlord_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    room_name: {
      type: String,
    },
    room_price: {
      type: String,
    },
    insurance_price: {
      type: String,
    },
    room_state_pic: {
      type: Array,
      default: [],
    },
    bd_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Building",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("TransactionList", transListSchema);
