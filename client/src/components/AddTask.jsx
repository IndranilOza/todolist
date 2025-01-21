import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../features/task/taskThunk";
import "../styles/AddTask.css";

const AddTask = () => {
  const [taskName, setTaskName] = useState("");
  const [taskDetails, setTaskDetails] = useState("");
  const [type, setType] = useState("personal");
  const [activeStatus, setActiveStatus] = useState("todo");
  const [dateTime, setDateTime] = useState("");

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { userId } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user) {
      dispatch(
        addTask({
          userId: userId,
          taskName,
          taskDetails,
          type,
          activeStatus,
          time: dateTime, // Include the selected date and time
        })
      );

      setTaskName("");
      setTaskDetails("");
      setDateTime("");
    }
  };

  return (
    <div className="add-task-main">
      <form className="add-task-form" onSubmit={handleSubmit}>
        <h3>Add Task</h3>
        <div>
          <label>Task Name:</label>
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Task Details:</label>
          <textarea
            value={taskDetails}
            onChange={(e) => setTaskDetails(e.target.value)}
          />
        </div>
        <div>
          <label>Type:</label>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="personal">Personal</option>
            <option value="work">Work</option>
            <option value="social">Social</option>
            <option value="study">Study</option>
          </select>
        </div>
        <div>
          <label>Status:</label>
          <select
            value={activeStatus}
            onChange={(e) => setActiveStatus(e.target.value)}
          >
            <option value="todo">Todo</option>
            <option value="done">Done</option>
            <option value="in progress">In Progress</option>
          </select>
        </div>
        <div>
          <label>Date and Time:</label>
          <input
            type="datetime-local"
            value={dateTime}
            onChange={(e) => setDateTime(e.target.value)}
            required
          />
        </div>
        <button className="add-task-btn" type="submit">
          Add Task
        </button>
      </form>
    </div>
  );
};

export default AddTask;
