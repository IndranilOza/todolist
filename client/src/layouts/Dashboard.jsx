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
          <button onClick={() => dispatch(logout())}>Log out</button>
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

              <button className="task-notification">
                <IoNotificationsCircle />
              </button>
            </div>
          </div>
          <div className="filter-section">
            <div className="task-count">35 tasks</div>
            <div className="filter-date"></div>
            <select name="task-status" id="task-status">
              <option value="" disabled={true}>
                By Status
              </option>
              <option value="todo">Todo</option>
              <option value="done">Done</option>
              <option value="in progress">In Progress</option>
            </select>
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
