import { useEffect, useState } from "react";
import API from "../api";

function AdminDashboard() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    API.get("/projects").then(res => {
      setProjects(res.data.data || []);
    });
  }, []);

  return (
    <div style={{padding:"20px"}}>
      <h2>Admin Dashboard</h2>

      {projects.length === 0 && <p>No Projects Found</p>}

      {projects.map(p => (
        <div key={p.id} style={{
          border:"1px solid #ccc",
          margin:"10px",
          padding:"10px",
          borderRadius:"5px"
        }}>
          <h3>{p.name}</h3>

          <button onClick={() => window.location.href=`/project/${p.id}`}>
            View Tasks
          </button>

          <button onClick={() => window.location.href=`/create-task/${p.id}`}>
            Create Task
          </button>
        </div>
      ))}
    </div>
  );
}

export default AdminDashboard;