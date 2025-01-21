import React, { useState } from "react";
import "../styles/ViewTask.css";
import { formatToLocalTime } from "./../utilities/helper";

const ViewTask = ({ isOpen, onClose, task, onUpdate }) => {
  const [editedTask, setEditedTask] = useState({ ...task });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTask({ ...editedTask, [name]: value });
  };

  const handleUpdate = () => {
    onUpdate(editedTask);
    onClose();
  };

  return (
    <div className="view-task-modal">
      <div className="modal-header">
        <h2>View & Edit Task</h2>
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
      </div>
      <div className="modal-body">
        <form>
          <div className="form-group">
            <label>Task Name</label>
            <input
              type="text"
              name="taskName"
              value={editedTask.taskName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Task Details</label>
            <textarea
              name="taskDetails"
              value={editedTask.taskDetails}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="form-group">
            <label>Task Type</label>
            <select name="type" value={editedTask.type} onChange={handleChange}>
              <option value="work">Work</option>
              <option value="personal">Personal</option>
              <option value="others">Others</option>
            </select>
          </div>
          <div className="form-group">
            <label>Status</label>
            <select
              name="activeStatus"
              value={editedTask.activeStatus}
              onChange={handleChange}
            >
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>
          <div className="form-group">
            <label>Time</label>
            <input
              type="datetime-local"
              name="time"
              value={formatToLocalTime(editedTask.time, "YYYY-MM-DDTHH:mm")}
              onChange={handleChange}
            />
          </div>
        </form>
      </div>
      <div className="modal-footer">
        <button className="save-button" onClick={handleUpdate}>
          Save
        </button>
        <button className="cancel-button" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ViewTask;
