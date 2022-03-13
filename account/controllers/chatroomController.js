const asyncHandler = require("express-async-handler");

const Chatroom = require("../models/chatRoomModel");
const User = require("../models/userModel");

// @desc Get Chatroom
// @router GET /api/chatrooms
// @access Private
const getChatroom = asyncHandler(async (req, res) => {
  const chatrooms = await Chatroom.find();

  res.status(200).json(chatrooms);
});

// @desc Set Chatroom
// @router POST /api/chatrooms
// @access Private
const setChatroom = asyncHandler(async (req, res) => {
  const chatroom = await Chatroom.create({
    u_id1: req.u_id1.id,
    u_id2: req.u_id2.id,
  });

  res.status(200).json(chatroom);
});

// @desc Update Chatroom
// @router PUT /api/chatrooms
// @access Private
const updateChatroom = asyncHandler(async (req, res) => {
  const chatroom = await Chatroom.findById(req.params.id);

  if (!chatroom) {
    res.status(400);
    throw new Error("Chatroom not found");
  }

  const updatedChatroom = await Chatroom.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(updatedChatroom);
});

// @desc Delete Chatroom
// @router DELETE /api/chatrooms
// @access Private
const deleteChatroom = asyncHandler(async (req, res) => {
  const chatroom = await Chatroom.findById(req.params.id);

  if (!chatroom) {
    res.status(400);
    throw new Error("Chatroom not found");
  }

  await chatroom.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getChatroom,
  setChatroom,
  updateChatroom,
  deleteChatroom,
};
