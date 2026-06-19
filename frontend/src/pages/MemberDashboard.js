import React, { useEffect, useState } from "react";
import API from "../services/api";
import "./MemberDashboard.css";
import { Link } from "react-router-dom";

function MemberDashboard() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await API.get("/tasks");
    setTasks(res.data);
  };

 const updateStatus = async(id,status)=>{
 console.log("Task updated:", id, status);
  try{

    await API.put(`/tasks/${id}`,{
      status
    });

    fetchTasks();
   
  }catch(error){

    console.log(error);

  }

};

  const completed = tasks.filter(
    (t) => t.status === "Completed"
  ).length;

  const pending = tasks.filter(
    (t) => t.status === "Pending"
  ).length;

  const progress = tasks.filter(
    (t) => t.status === "In Progress"
  ).length;

  return (
    <div className="member-container">

      <div className="member-sidebar">
        <h2 style={{color:"blue"}}>Team Manager</h2>

        <ul style={{backgroundColor:"lightblue",border:"2px"}}>
          <li>Dashboard</li>
         <Link to="profile"> <li>Profile</li></Link>
          <Link to="/tasks"><li>My Tasks</li></Link>
         <Link to="/"><li>Logout</li></Link> 
        </ul>
      </div>

      <div className="member-main">

        <div className="member-header">
          <h1>Member Dashboard</h1>
          <p>Manage and update your assigned tasks</p>
        </div>

        <div className="member-cards">

          <div className="member-card">
            <h3>Assigned Tasks</h3>
            <h2>{tasks.length}</h2>
          </div>

          <div className="member-card">
            <h3>Completed</h3>
            <h2>{completed}</h2>
          </div>

          <div className="member-card">
            <h3>Pending</h3>
            <h2>{pending}</h2>
          </div>

          <div className="member-card">
            <h3>In Progress</h3>
            <h2>{progress}</h2>
          </div>

        </div>

        <div className="member-table">

          <h2>My Tasks</h2>

          <table>
            <thead>
              <tr>
                <th>Task</th>
                <th>Status</th>
                <th>Update Status</th>
              </tr>
            </thead>

            <tbody>
              {tasks.map((task) => (
                <tr key={task._id}>
                  <td>{task.title}</td>

                  <td>{task.status}</td>

                  <td>
                    <select
                      className="status-select"
                      value={task.status}
                      onChange={(e) =>
                        updateStatus(
                          task._id,
                          e.target.value
                        )
                      }
                    >
                      <option value="Pending">
                        Pending
                      </option>

                      <option value="In Progress">
                        In Progress
                      </option>

                      <option value="Completed">
                        Completed
                      </option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default MemberDashboard;