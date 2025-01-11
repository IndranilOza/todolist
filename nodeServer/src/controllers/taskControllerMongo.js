const Task = require("../models/taskModelMongo");

// Create a new task
exports.createTask = async (req, res) => {
  try {
    const { userId, taskName, taskDetails, time, activeStatus, type } =
      req.body;

    const newTask = await Task.create({
      userId,
      taskName,
      taskDetails,
      time,
      activeStatus,
      type,
    });

    res.status(201).json(newTask);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Get all tasks for a user
exports.getTasks = async (req, res) => {
  try {
    const { userId } = req.params;

    const tasks = await Task.find({ userId });

    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Update a task
exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { taskName, taskDetails, time, activeStatus, type } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { taskName, taskDetails, time, activeStatus, type },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ error: "Server error" });
  }
};
