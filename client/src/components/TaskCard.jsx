import "../styles/TaskCard.css";
const TaskCard = (props) => {
  return (
    <div className="task-card-main">
      <div className="task-card-top">
        <div>{props?.state?.activeStatus}</div>
      </div>
      <div className="card-title">
        <div>{props?.state?.taskName}</div>
        <div>{props?.state?.time}</div>
      </div>
      <div className="card-details">
        <div>{props?.state?.taskDetails}</div>
      </div>
      <div className="card-bottom">
        <div>{props?.state?.type}</div>
      </div>
    </div>
  );
};

export default TaskCard;
