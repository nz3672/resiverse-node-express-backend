const express = require("express");
const router = express.Router();
const {
  getUser,
  registerUser,
  updateUser,
  deleteUser,
  loginUser,
  getMe,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").get(getUser);
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

router.route("/:id").put(updateUser).delete(deleteUser);
router.get("/me", protect, getMe);

// router.get("/", getUser);

// router.post("/", setUser);

// router.put("/:id", updateUser);

// router.delete("/:id", deleteUser);

module.exports = router;
