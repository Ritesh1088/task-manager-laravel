import { useEffect, useState } from "react";
import API from "../api";

function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    API.get("/projects")
      .then(res => {
        console.log("Projects API:", res.data);

        // safe handling
        if (Array.isArray(res.data)) {
          setProjects(res.data);
        } else if (Array.isArray(res.data.data)) {
          setProjects(res.data.data);
        } else {
          setProjects([]);
        }
      })
      .catch(err => {
        console.error("Error:", err);
        setProjects([]);
      });
  }, []);

  return (
    <div>
      <h2>Projects</h2>

      {projects.length === 0 && <p>No Projects Found</p>}

      {projects.map(p => (
        <div
          key={p.id}
          style={{
            border: "1px solid black",
            margin: "10px",
            padding: "10px"
          }}
        >
          <h3>{p.name}</h3>

          {/* 👉 Project Tasks */}
          <button
            onClick={() => window.location.href = `/project/${p.id}`}
          >
            View Tasks
          </button>

          {/* 👉 Create Task */}
          <button
            onClick={() => window.location.href = `/create-task/${p.id}`}
            style={{ marginLeft: "10px" }}
          >
            Create Task
          </button>
        </div>
      ))}
    </div>
  );
}

export default Projects;