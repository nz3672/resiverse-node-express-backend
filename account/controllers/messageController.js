const asyncHandler = require("express-async-handler");

const Message = require("../models/messageModel");

// @desc Get Message
// @router GET /api/messages
// @access Private
const getMessage = asyncHandler(async (req, res) => {
  const messages = await Message.find();

  res.status(200).json(messages);
});

// @desc Set Message
// @router POST /api/messages
// @access Private
const setMessage = asyncHandler(async (req, res) => {
  const message = await Message.create({
    msg_message: req.body.msg_message,
    msg_sender_id: req.body.msg_sender_id,
    cr_id: req.body.cr_id,
  });

  res.status(200).json(message);
});

// @desc Update Message
// @router PUT /api/messages
// @access Private
const updateMessage = asyncHandler(async (req, res) => {
  const message = await Message.findById(req.params.id);

  if (!message) {
    res.status(400);
    throw new Error("Message not found");
  }

  const updatedMessage = await Message.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(updatedMessage);
});

// @desc Delete Message
// @router DELETE /api/messages
// @access Private
const deleteMessage = asyncHandler(async (req, res) => {
  const message = await Message.findById(req.params.id);

  if (!message) {
    res.status(400);
    throw new Error("Message not found");
  }

  await message.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getMessage,
  setMessage,
  updateMessage,
  deleteMessage,
};
