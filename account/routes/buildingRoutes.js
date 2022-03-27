const express = require("express");
const router = express.Router();
const {
  setBuilding,
  updateBuilding,
  deleteBuilding,
  getBuildingByID,
  getAllBuilding,
} = require("../controllers/buildingController");
const { protect } = require("../middleware/authMiddleware");

router
  .route("/:id")
  .put(protect, updateBuilding)
  .delete(protect, deleteBuilding)
  .get(protect, getBuildingByID);
router.route("/post").post(protect, setBuilding);
router.route("/").get(getAllBuilding);
// router.get("/", getBuilding);

// router.post("/", setBuilding);

// router.put("/:id", updateBuilding);

// router.delete("/:id", deleteBuilding);

module.exports = router;
