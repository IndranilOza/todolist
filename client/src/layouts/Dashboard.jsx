import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTasks } from "../features/task/taskThunk";
import "../styles/Dashboard.css"; // Styling for dashboard
import Profile from "../components/Profile";
import { FiSearch } from "react-icons/fi";
import { IoNotificationsCircle } from "react-icons/io5";
import { IoIosCreate } from "react-icons/io";
import { logout } from "../features/auth/authSlice";
import { AnimatePresence, motion } from "framer-motion";
import AddTask from "../components/AddTask";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { IoMdCloseCircle } from "react-icons/io";
import { IoMdLogOut } from "react-icons/io";
import TaskCard from "../components/TaskCard";

const Dashboard = () => {
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false);
  const { tasks } = useSelector((state) => state.tasks);
  const { user } = useSelector((state) => state.auth);
  const { userId } = useSelector((state) => state.auth);

  const [filteredTasks, setFilteredTasks] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    if (user) {
      dispatch(fetchTasks(userId));
    }
  }, [dispatch, user, userId]);

  useEffect(() => {
    applyFilters(activeFilter);
  }, [activeFilter, tasks]);

  const handleSetFilter = (filter) => {
    setActiveFilter(filter);
  };

  // Filter handler
  const applyFilters = (filter) => {
    const now = new Date();

    let filtered = tasks;

    switch (filter) {
      case "today":
        filtered = tasks.filter((task) => {
          const taskDate = new Date(task.time);
          return (
            taskDate.toDateString() === now.toDateString() &&
            task.activeStatus !== "done"
          );
        });
        break;

      case "overdue":
        filtered = tasks.filter((task) => {
          const taskDate = new Date(task.time);
          return taskDate < now && task.activeStatus !== "done";
        });
        break;

      case "coming":
        filtered = tasks.filter((task) => {
          const taskDate = new Date(task.time);
          return taskDate > now;
        });
        break;

      case "personal":
      case "work":
      case "social":
      case "study":
        filtered = tasks.filter((task) => task.type === filter);
        break;

      case "todo":
      case "in progress":
      case "done":
        filtered = tasks.filter((task) => task.activeStatus === filter);
        break;

      default:
        filtered = tasks;
    }

    setFilteredTasks(filtered);
  };

  const handleToggle = () => {
    setToggle((prev) => !prev);
  };

  return (
    <>
      <div className="dashboard-container">
        <div className="sidebar">
          <Profile />
          <div className="sidebar-dash">
            <span>
              <MdOutlineDashboardCustomize />
            </span>
            <span> Dashboard</span>
          </div>
          <div className="filter-btn">
            <button
              className={activeFilter === "all" ? "flt-btn-active" : ""}
              onClick={() => handleSetFilter("all")}
            >
              All
            </button>
            <button
              className={activeFilter === "today" ? "flt-btn-active" : ""}
              onClick={() => handleSetFilter("today")}
            >
              Today
            </button>
            <button
              className={activeFilter === "coming" ? "flt-btn-active" : ""}
              onClick={() => handleSetFilter("coming")}
            >
              Coming
            </button>
            <button
              className={activeFilter === "overdue" ? "flt-btn-active" : ""}
              onClick={() => handleSetFilter("overdue")}
            >
              Overdue
            </button>
            <button
              className={activeFilter === "to do" ? "flt-btn-active" : ""}
              onClick={() => handleSetFilter("to do")}
            >
              To do
            </button>
            <button
              className={activeFilter === "done" ? "flt-btn-active" : ""}
              onClick={() => handleSetFilter("done")}
            >
              Done
            </button>
            <button
              className={activeFilter === "in progress" ? "flt-btn-active" : ""}
              onClick={() => handleSetFilter("in progress")}
            >
              In Progress
            </button>
            <button
              className={activeFilter === "personal" ? "flt-btn-active" : ""}
              onClick={() => handleSetFilter("personal")}
            >
              Personal
            </button>
            <button
              className={activeFilter === "work" ? "flt-btn-active" : ""}
              onClick={() => handleSetFilter("work")}
            >
              Work
            </button>
            <button
              className={activeFilter === "social" ? "flt-btn-active" : ""}
              onClick={() => handleSetFilter("social")}
            >
              Social
            </button>
            <button
              className={activeFilter === "study" ? "flt-btn-active" : ""}
              onClick={() => handleSetFilter("study")}
            >
              Study
            </button>
          </div>
        </div>
        <div className="content">
          <div className="search-bar">
            <div className="search-container">
              <label htmlFor="search-task" className="search-inp-label">
                <FiSearch />
              </label>
              <input
                type="search"
                className="search-task"
                name="search-task"
                placeholder="Search for tasks"
                id="search-task"
              />
            </div>

            <div className="create-task-section">
              <button onClick={handleToggle} className="create-button">
                <span>Add Task</span>
                <span>
                  <IoIosCreate />
                </span>
              </button>

              <button onClick={() => dispatch(logout())} className="log-out">
                <IoMdLogOut />
              </button>
            </div>
          </div>
          <div className="filter-section">
            <div className="task-count">{filteredTasks.length} Tasks</div>
            {/* <div className="filter-date"></div>
            <select name="task-status" id="task-status">
              <option value="" disabled={true}>
                By Status
              </option>
              <option value="todo">Todo</option>
              <option value="done">Done</option>
              <option value="in progress">In Progress</option>
            </select> */}
          </div>
          <div className="task-card-container">
            <ul>
              {filteredTasks.map((task) => (
                <li key={task.taskId}>
                  <TaskCard state={task} />
                </li>
              ))}
            </ul>
            {filteredTasks.length === 0 && <p>No tasks found.</p>}
          </div>
        </div>
      </div>
      <AnimatePresence>
        {toggle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="add-task-overlay"
          >
            <motion.div
              initial={{ width: "0dvw", opacity: 0 }}
              animate={{ width: "40dvw", opacity: 1 }}
              exit={{ width: "0dvw", opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="add-task-modal"
            >
              <motion.div>
                <button className="close-btn" onClick={handleToggle}>
                  <IoMdCloseCircle />
                </button>
              </motion.div>
              <AddTask />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Dashboard;
