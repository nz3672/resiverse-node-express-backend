const asyncHandler = require("express-async-handler");

const Room = require("../models/roomModel");

// @desc Get Room
// @router GET /api/rooms
// @access Private
const getRoom = asyncHandler(async (req, res) => {
  const rooms = await Room.find();

  res.status(200).json(rooms);
});

// @desc Set Room
// @router POST /api/rooms
// @access Private
const setRoom = asyncHandler(async (req, res) => {
  const room = await Room.create({
    ro_state: req.body.ro_state,
    ro_cert: req.body.ro_cert,
    ro_address: req.body.ro_address,
    ro_size: req.body.ro_size,
    ro_desc: req.body.ro_desc,
    bd_id: req.body.bd_id,
  });

  res.status(200).json(room);
});

// @desc Update Room
// @router PUT /api/rooms
// @access Private
const updateRoom = asyncHandler(async (req, res) => {
  const room = await Room.findById(req.params.id);

  if (!room) {
    res.status(400);
    throw new Error("Room not found");
  }

  const updatedRoom = await Room.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedRoom);
});

// @desc Delete Room
// @router DELETE /api/rooms
// @access Private
const deleteRoom = asyncHandler(async (req, res) => {
  const room = await Room.findById(req.params.id);

  if (!room) {
    res.status(400);
    throw new Error("Room not found");
  }

  await room.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getRoom,
  setRoom,
  updateRoom,
  deleteRoom,
};
