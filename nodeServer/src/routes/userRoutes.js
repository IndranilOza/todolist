const express = require("express");
const userController = require("../controllers/userControllerSQL");
// const userController = require("../controllers/userControllerMongo");
const authenticate = require("../middlewares/auth");

const router = express.Router();

// Public routes
router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);

// Protected route example
router.get("/profile", authenticate, (req, res) => {
  res.status(200).json({ message: `Welcome ${req.user.id}` });
});

module.exports = router;
