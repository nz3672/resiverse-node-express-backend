const express = require("express");
const router = express.Router();
const {
  getTransList,
  setTransList,
  updateTransList,
  deleteTransList,
} = require("../controllers/transListController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").get(getTransList).post(protect, setTransList);
router
  .route("/:id")
  .put(protect, updateTransList)
  .delete(protect, deleteTransList);

// router.get("/", getTransList);

// router.post("/", setTransList);

// router.put("/:id", updateTransList);

// router.delete("/:id", deleteTransList);

module.exports = router;
