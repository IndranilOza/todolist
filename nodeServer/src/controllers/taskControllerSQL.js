const { pgPool } = require("../config/db");

// Create a new task
exports.createTask = async (req, res) => {
  try {
    const { userId, taskName, taskDetails, time, activeStatus, type } =
      req.body;

    const query = `
      INSERT INTO tasks ("userId", "taskName", "taskDetails", "time", "activeStatus", "type")
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;

    const values = [userId, taskName, taskDetails, time, activeStatus, type];
    const result = await pgPool.query(query, values);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Get all tasks for a user
exports.getTasks = async (req, res) => {
  try {
    const { userId } = req.params;

    const query = `
      SELECT * FROM tasks
      WHERE "userId" = $1;
    `;

    const result = await pgPool.query(query, [userId]);

    res.status(200).json(result.rows);
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

    const query = `
      UPDATE tasks
      SET "taskName" = $1, "taskDetails" = $2, "time" = $3, "activeStatus" = $4, "type" = $5
      WHERE "taskId" = $6
      RETURNING *;
    `;

    const values = [taskName, taskDetails, time, activeStatus, type, id];
    const result = await pgPool.query(query, values);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const query = `
      DELETE FROM tasks
      WHERE "taskId" = $1
      RETURNING *;
    `;

    const result = await pgPool.query(query, [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ error: "Server error" });
  }
};
