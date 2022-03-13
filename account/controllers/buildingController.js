const asyncHandler = require("express-async-handler");

const Building = require("../models/buildingModel");

// @desc Get Building
// @router GET /api/buildings
// @access Private
const getBuilding = asyncHandler(async (req, res) => {
  const buildings = await Building.find();

  res.status(200).json(buildings);
});

// @desc Set Building
// @router POST /api/buildings
// @access Private
const setBuilding = asyncHandler(async (req, res) => {
  const building = await Building.create({
    bd_desc: req.body.bd_desc,
    bd_address: req.body.bd_address,
    bd_state: req.body.bd_state,
    bd_cert: req.body.bd_cert,
    bd_type: req.body.bd_type,
    u_id: req.body.u_id,
  });

  res.status(200).json(building);
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
};
