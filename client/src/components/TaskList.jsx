import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../features/task/taskThunk";

const TaskList = () => {
  const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector((state) => state.tasks);
  const { user } = useSelector((state) => state.auth);
  const { userId } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      dispatch(fetchTasks(userId));
    }
  }, [dispatch, user, userId]);

  return (
    <div>
      <h2>Task List</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <strong>{task.taskName}</strong> - {task.activeStatus}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
