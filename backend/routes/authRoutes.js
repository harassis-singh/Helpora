
const express = require("express");

const router = express.Router();

// Import authentication controllers
const {
  registerUser,
  loginUser
} = require("../controllers/authController");

// Import authentication middleware
const { protect } = require("../middleware/authMiddleware");

// Register API
router.post("/register", registerUser);

// Login API
router.post("/login", loginUser);

// Get logged-in user profile
router.get("/me", protect, (req, res) => {
  res.status(200).json({
    message: "You are authenticated!",
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role
    }
  });
});

module.exports = router;
