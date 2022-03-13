const express = require("express");
const router = express.Router();
const {
  getMessage,
  setMessage,
  updateMessage,
  deleteMessage,
} = require("../controllers/messageController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getMessage).post(protect, setMessage);
router.route("/:id").put(protect, updateMessage).delete(protect, deleteMessage);

// router.get("/", getMessage);

// router.post("/", setMessage);

// router.put("/:id", updateMessage);

// router.delete("/:id", deleteMessage);

module.exports = router;
