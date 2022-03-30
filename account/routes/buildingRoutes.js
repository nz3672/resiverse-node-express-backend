const express = require("express");
const router = express.Router();
const {
  setBuilding,
  updateBuilding,
  deleteBuilding,
  getBuildingByID,
  getAllBuilding,
  getMyBuilding,
} = require("../controllers/buildingController");
const { protect } = require("../middleware/authMiddleware");

router
  .route("/:id")
  .put(protect, updateBuilding)
  .delete(protect, deleteBuilding);

router.route("/post").post(protect, setBuilding);
router.route("/").get(getAllBuilding);
router.route("/me").get(protect, getMyBuilding);

// router.get("/", getBuilding);

// router.post("/", setBuilding);

// router.put("/:id", updateBuilding);

// router.delete("/:id", deleteBuilding);

module.exports = router;
