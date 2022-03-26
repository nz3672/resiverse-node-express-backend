const asyncHandler = require("express-async-handler");
const Building = require("../models/buildingModel");
const { upImgToS3, upload } = require("../controllers/imgController");
const User = require("../models/userModel");
// @desc Get Building
// @router GET /api/buildings
// @access Private
const getBuilding = asyncHandler(async (req, res) => {
  const buildings = await Building.find();

  res.status(200).json(buildings);
});

// @desc Get Building
// @router GET /api/buildings/all
// @access public
const getAllBuilding = asyncHandler(async (req, res) => {
  const buildings = await Building.find();

  res.status(200).json(buildings);
});

// @desc Set Building
// @router POST /api/buildings
// @access Private
const setBuilding = asyncHandler(async (req, res) => {
  let img;
  let cert;
  const imgs = upload.fields([
    { name: "bd_img", maxCount: 1 },
    { name: "bd_cert", maxCount: 1 },
  ]);

  imgs(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ success: false, message: err.message });
    }
    img = req.files["bd_img"][0].location;
    cert = req.files["bd_cert"][0].location;
    // const user = await User.create({
    //   u_username: "eieiza",
    //   u_email: "eieiza",
    //   u_name: "eieiza",
    //   u_bankactname: "eieiza",
    //   u_password: "eieiza",
    //   u_bankactid: "089999999",
    //   u_surname: "eieiza",
    //   u_phonenum: "089999999",
    //   u_idcard: "089999999",
    // });
    // res.status(200).json({ data: img, user1: user });
    const building = await Building.create({
      bd_location: req.body.bd_location,
      bd_facilities: req.body.bd_facilities,
      bd_room: req.body.bd_room,
      bd_address: req.body.bd_address,
      bd_desc: req.body.bd_desc,
      bd_cert: cert,
      bd_type: req.body.bd_type,
      bd_website: req.body.bd_website,
      bd_lineid: req.body.bd_lineid,
      bd_phone: req.body.bd_phone,
      bd_img: img,
      bd_name: req.body.bd_name,
      u_id: req.body.u_id,
    });
    if (building) {
      res.status(200).json({ data: building });
    } else {
      res.status(400);
      throw new Error("Invalid Building");
    }
  });

  // const building = await Building.create({
  //   bd_facilities: req.body.bd_facilities,
  //   bd_room: req.body.bd_room,
  //   bd_address: req.body.bd_address,
  //   bd_desc: req.body.bd_desc,
  //   // bd_cert: cert,
  //   bd_type: req.body.bd_type,
  //   bd_website: req.body.bd_website,
  //   bd_lineid: req.body.bd_lineid,
  //   bd_phone: req.body.bd_phone,
  //   // bd_img: img,
  //   bd_name: req.body.bd_name,
  //   u_id: req.body.u_id,
  // });
  // res.status(200).json({ data: "dog" });
  // if (building) {
  //   res.status(200).json({ data: building });
  // } else {
  //   res.status(400);
  //   throw new Error("Invalid Building");
  // }
  // const building = await Building.create({
  //   bd_facilities: req.body.bd_facilities,
  //   bd_room: req.body.bd_room,
  //   bd_address: req.body.bd_address,
  //   bd_desc: req.body.bd_desc,
  //   bd_cert: req.body.bd_cert,
  //   bd_type: req.body.bd_type,
  //   bd_website: req.body.bd_website,
  //   bd_lineid: req.body.bd_lineid,
  //   bd_phone: req.body.bd_phone,
  //   bd_img: req.body.bd_img,
  //   bd_name: req.body.bd_name,
  //   u_id: req.body.u_id,
  // });
});

// @desc Update Building
// @router PUT /api/buildings
// @access Private
const updateBuilding = asyncHandler(async (req, res) => {
  const building = await Building.findById(req.params.id);

  if (!building) {
    res.status(400);
    throw new Error("Building not found");
  }

  const updatedBuilding = await Building.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(updatedBuilding);
});

// @desc Delete Building
// @router DELETE /api/buildings
// @access Private
const deleteBuilding = asyncHandler(async (req, res) => {
  const building = await Building.findById(req.params.id);

  if (!building) {
    res.status(400);
    throw new Error("Building not found");
  }

  await building.remove();

  res.status(200).json({ id: req.params.id });
});

const getBuildingByID = asyncHandler(async (req, res) => {
  const building = await Building.findById(req.params.id);

  if (!building) {
    res.status(400);
    throw new Error("Building not found");
  }

  res.status(200).json(building);
});

module.exports = {
  getBuilding,
  setBuilding,
  updateBuilding,
  deleteBuilding,
  getBuildingByID,
  getAllBuilding,
};
