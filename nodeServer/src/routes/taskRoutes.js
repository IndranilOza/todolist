const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskControllerSQL");
// const taskController = require("../controllers/taskControllerMongo");
const authenticate = require("../middlewares/auth"); // Import the authentication middleware

// Use authentication for all routes related to tasks
router.post("/", authenticate, taskController.createTask);
router.get("/:userId", authenticate, taskController.getTasks);
router.put("/:id", authenticate, taskController.updateTask);
router.delete("/:id", authenticate, taskController.deleteTask);

module.exports = router;
