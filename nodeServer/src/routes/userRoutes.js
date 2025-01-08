const express = require("express");
// const { registerUser, loginUser } = require("../controllers/userControllerSQL");
const {
  registerUser,
  loginUser,
} = require("../controllers/userControllerMongo");
const authenticate = require("../middlewares/auth");

const router = express.Router();

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected route example
router.get("/profile", authenticate, (req, res) => {
  res.status(200).json({ message: `Welcome ${req.user.id}` });
});

module.exports = router;
