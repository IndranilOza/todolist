import { useEffect, useState } from "react";
import "../styles/TaskCard.css";
import { formatToLocalTime } from "./../utilities/helper";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEye } from "react-icons/fi";
import ViewTask from "./ViewTask";
import { motion, AnimatePresence } from "framer-motion";
const TaskCard = (props) => {
  const [overdue, setOverdue] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleViewClick = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleTaskUpdate = (updatedTask) => {
    console.log("Updated Task:", updatedTask);
    // Add logic to update the task in state or API
  };

  useEffect(() => {
    const now = new Date();
    const taskDate = new Date(props?.state.time);
    if (taskDate < now && props?.state.activeStatus !== "done") {
      setOverdue(true);
    }
  }, [props?.state]);
  return (
    <>
      <div className="task-card-main">
        <div className="task-card-top">
          <div
            style={{
              color: "white",
              fontSize: ".8rem",
              fontWeight: "500",
              padding: "1px 8px",
              borderRadius: "30px",
              backgroundColor: `var(--${props?.state?.activeStatus.replace(
                / /g,
                "-"
              )})`,
            }}
          >
            {props?.state?.activeStatus}
          </div>
          {overdue && <div className="task-overdue">Overdue</div>}
        </div>
        <div className="card-title">
          <div>{props?.state?.taskName}</div>
          <div>{formatToLocalTime(props?.state?.time)}</div>
        </div>
        <div className="card-details">
          <div>{props?.state?.taskDetails}</div>
        </div>
        <div className="card-bottom">
          <div
            style={{
              fontSize: ".8rem",
              fontWeight: "500",
              padding: "1px 8px",
              borderRadius: "5px",
              border: `1.5px solid var(--task-${props?.state?.type})`,
              color: `var(--task-${props?.state?.type})`,
            }}
          >
            {props?.state?.type}
          </div>
          <div className="task-edit-container">
            <button onClick={handleViewClick} style={{ color: "var(--todo)" }}>
              <FiEye />
            </button>
            {/* <button style={{ color: "var(--accent-add)" }}>
              <FaRegEdit />
            </button> */}
            <button style={{ color: "red", position: "relative" }}>
              <RiDeleteBin6Line />
              {/* <div
                style={{
                  position: "absolute",
                  height: "30px",
                  width: "50px",
                  backgroundColor: "gray",
                }}
              ></div> */}
            </button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isModalOpen && (
          <motion.div className="view-task-overlay">
            <ViewTask
              isOpen={isModalOpen}
              onClose={handleModalClose}
              task={props.state}
              onUpdate={handleTaskUpdate}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default TaskCard;
