const express = require("express");
const router = express.Router();
const {
  getRoom,
  setRoom,
  updateRoom,
  deleteRoom,
} = require("../controllers/roomController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getRoom).post(protect, setRoom);
router.route("/:id").put(protect, updateRoom).delete(protect, deleteRoom);

// router.get("/", getRoom);

// router.post("/", setRoom);

// router.put("/:id", updateRoom);

// router.delete("/:id", deleteRoom);

module.exports = router;
