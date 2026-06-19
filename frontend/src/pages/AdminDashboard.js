import React, { useEffect, useState } from "react";
import API from "../services/api";

function AdminDashboard() {

  const [tasks,setTasks] = useState([]);
  const [users,setUsers] = useState([]);

  const [title,setTitle] = useState("");
  const [assignedTo,setAssignedTo] = useState("");
  const [dueDate,setDueDate] = useState("");


  useEffect(() => {

  fetchData();

  const interval = setInterval(() => {
    fetchData();
  }, 5000);

  return () => clearInterval(interval);

}, []);

 const fetchData = async () => {
  try {
    console.log("Fetching users...");

    const userRes = await API.get("/users");
      const taskRes = await API.get("/tasks");

  console.log("ADMIN TASKS", taskRes.data);

  setTasks(taskRes.data);

    console.log("Users:", userRes.data);

    setUsers(userRes.data);

  } catch(error) {
    console.log("ERROR:", error);
  }
};
const createTask = async () => {

  if (!title) {
    alert("Enter Task Title");
    return;
  }

  if (!assignedTo) {
    alert("Please Select Member");
    return;
  }

  if (!dueDate) {
    alert("Please Select Due Date");
    return;
  }

  try {

    await API.post("/tasks", {
      title,
      assignedTo,
      dueDate
    });

    alert("Task Assigned Successfully");

    setTitle("");
    setAssignedTo("");
    setDueDate("");

    fetchData();

  } catch (error) {
    console.log(error);
  }
};

  const completed =
    tasks.filter(t=>t.status==="Completed").length;

  const pending =
    tasks.filter(t=>t.status==="Pending").length;

  return(
    <div style={{padding:"20px"}}>

      <h1>Admin Dashboard</h1>

      <div style={{
        border:"2px",
        padding:"20px",
        width:"1200px",
        height:"30px",
        backgroundColor:"#f0f8ff",  
        display:"flex",
        gap:"20px",
        marginBottom:"20px",
        color:"blue",
        fontWeight:"bold",
        textAlign:"center",
      

      }}>

        <div className="card">
          Total Tasks : {tasks.length}
        </div>

        <div className="card">
          Completed : {completed}
        </div>

        <div className="card">
          Pending : {pending}
        </div>

      </div>

      <h2>Assign Task</h2>
      <label><b>Task Title:</b></label>
      <input
        placeholder="Task Title"
        value={title}
        onChange={(e)=>setTitle(e.target.value)}
      />

      <br/><br/>
<label><b>Assign To:</b></label>
     <select
  value={assignedTo}
  onChange={(e) => setAssignedTo(e.target.value)}
>

  <option value="">Select Member</option>

  {users
    .filter(user => user.role === "member")
    .map(user => (
      <option
        key={user._id}
        value={user._id}
      >
        {user.name}
      </option>
    ))
  }

</select>
      <br/><br/>
<label><b>Due Date:</b></label>
      <input
        type="date"
        value={dueDate}
        onChange={(e)=>setDueDate(e.target.value)}
      />

      <br/><br/>

      <button style={{ padding: "10px 20px", backgroundColor: "#007bff", color: "white", border: "none", cursor: "pointer" }} onClick={createTask}>
        Assign Task
      </button>

      <hr/>

      <h2>All Tasks</h2>

      <table border="1" width="100%">
        <thead>
          <tr>
            <th>Task</th>
            <th>Member</th>
            <th>Status</th>
            <th>Due Date</th>
          </tr>
        </thead>

        <tbody>

          {
            tasks.map(task=>(
              <tr key={task._id}>
                <td>{task.title}</td>
                <td>{task.assignedTo?.name}</td>
                <td>{task.status}</td>
                <td>
                  {new Date(task.dueDate)
                  .toLocaleDateString()}
                </td>
              </tr>
            ))
          }

        </tbody>

      </table>

    </div>
  );
}

export default AdminDashboard;