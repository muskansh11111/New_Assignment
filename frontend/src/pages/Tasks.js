import { useEffect, useState } from "react";
import API from "../services/api";

function Tasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await API.get("/tasks");
    setTasks(res.data);
  };

  const updateStatus = async (id, status) => {
    await API.put(`/tasks/${id}`, {
      status,
    });

    fetchTasks();
  };

  return (
    <div className="container">
      <h2>Task</h2>

      {tasks.map((task) => (
        <div key={task._id}>
          <h4>{task.title}</h4>

          <p>Status: {task.status}</p>

          <button
            onClick={() =>
              updateStatus(task._id, "Completed")
            }
          >
            Complete
          </button>
        </div>
      ))}
    </div>
  );
}

export default Tasks;