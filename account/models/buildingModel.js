const mongoose = require("mongoose");

const buildingSchema = mongoose.Schema({
  bd_location: {
    lat: String,
    lng: String,
    createdAt: Date,
    placeId: String,
    // required: [true, "Please enter a cert"],
  },
  bd_cert: {
    type: String,
    // required: [true, "Please enter a cert"],
  },
  bd_facilities: {
    type: Array,
    default: [],
    required: [true, "Please enter a facility"],
  },
  bd_room: {
    type: Array,
    default: [],
  },
  bd_address: {
    bd_houseNo: String,
    bd_subDist: String,
    bd_dist: String,
    bd_province: String,
    bd_postNum: String,
  },
  bd_type: {
    type: String,
  },
  bd_desc: {
    type: String,
    required: [true, "Please enter a description"],
  },
  bd_website: {
    type: String,
  },
  bd_lineid: {
    type: String,
  },
  bd_phone: {
    type: String,
    required: [true, "Please enter a phone"],
  },
  bd_img: {
    type: String,
    // required: [true, "Please enter a img"],
  },
  bd_name: {
    type: String,
    required: [true, "Please enter a name"],
  },
  insurance_price: {
    type: String,
  },
  u_id: {
    type: mongoose.Schema.Types.ObjectId,
    //   required: true,
    ref: "User",
  },
});

module.exports = mongoose.model("Building", buildingSchema);
