const express = require("express");
const router = express.Router();
const {
  getChatroom,
  setChatroom,
  updateChatroom,
  deleteChatroom,
} = require("../controllers/chatroomController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getChatroom).post(protect, setChatroom);
router
  .route("/:id")
  .put(protect, updateChatroom)
  .delete(protect, deleteChatroom);

// router.get("/", getChatroom);

// router.post("/", setChatroom);

// router.put("/:id", updateChatroom);

// router.delete("/:id", deleteChatroom);

module.exports = router;
