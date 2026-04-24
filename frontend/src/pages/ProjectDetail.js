import { useEffect, useState } from "react";
import API from "../api";
import { useParams } from "react-router-dom";

function ProjectDetail() {
  const { id } = useParams();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    API.get("/projects").then(res => {
      console.log("API:", res.data);

      // 🔥 handle both cases safely
      let projects = [];

      if (Array.isArray(res.data)) {
        projects = res.data;
      } else if (Array.isArray(res.data.data)) {
        projects = res.data.data;
      }

      const project = projects.find(p => p.id == id);

      setTasks(project?.tasks || []);
    });
  }, [id]);

  return (
    <div>
      <h2>Project Tasks</h2>

      {tasks.length === 0 && <p>No Tasks Found</p>}

      {tasks.map(t => (
        <div key={t.id}>
          <p>{t.title} - {t.status}</p>
        </div>
      ))}
    </div>
  );
}

export default ProjectDetail;