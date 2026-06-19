import { useState, useEffect } from "react";
import API from "../services/api";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const res = await API.get("/projects");
    setProjects(res.data);
  };

  const createProject = async () => {
    await API.post("/projects", {
      title,
      description: "Project Description",
    });

    fetchProjects();
  };

  return (
    <div className="container">
      <h2>Projects</h2>

      {user.role === "admin" && (
        <>
          <input
            placeholder="Project Name"
            onChange={(e) => setTitle(e.target.value)}
          />

          <button onClick={createProject}>
            Add Project
          </button>
        </>
      )}

      {projects.map((p) => (
        <div key={p._id}>
          <h4>{p.title}</h4>
        </div>
      ))}
    </div>
  );
}

export default Projects;