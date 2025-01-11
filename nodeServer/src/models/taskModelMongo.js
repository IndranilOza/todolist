const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to a User model if it exists
      required: true,
    },
    taskName: {
      type: String,
      required: true,
    },
    taskDetails: {
      type: String,
    },
    time: {
      type: Date,
      required: true,
    },
    activeStatus: {
      type: String,
      enum: ["todo", "done", "in progress"],
      default: "todo",
    },
    type: {
      type: String,
      enum: ["personal", "work", "social", "study"],
      required: true,
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

const Task = mongoose.model("Task", TaskSchema);
module.exports = Task;
