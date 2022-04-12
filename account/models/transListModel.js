const mongoose = require("mongoose");

const transListSchema = mongoose.Schema(
  {
    room_insur_pic: {
      type: String,
    },
    tr_isDebate: {
      type: Boolean,
    },
    tr_landlord_debate: {
      type: Boolean,
    },
    tr_getBackInsurForTenant: {
      type: String,
    },
    tr_debate_reason: {
      type: String,
    },
    tr_insur_after_left: {
      waterUnitAfLeft: String,
      waterAfLeft: String,
      electUnitAfLeft: String,
      electAfLeft: String,
    },
    tr_insur_left_type: {
      wood: {
        woodCountDamage: String,
        woodMoneyDamage: String,
      },
      wall: {
        wallCountDamage: String,
        wallMoneyDamage: String,
      },
      nail: {
        nailCountDamage: String,
        nailMoneyDamage: String,
      },
    },
    tr_slip_img: {
      type: String,
    },
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
