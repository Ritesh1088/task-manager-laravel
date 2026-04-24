import { useEffect, useState } from "react";
import API from "../api";

function Tasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    API.get("/my-tasks")
      .then(res => {
        console.log("Tasks API:", res.data);

        // ✅ safe handling
        if (Array.isArray(res.data)) {
          setTasks(res.data);
        } else if (Array.isArray(res.data.data)) {
          setTasks(res.data.data);
        } else {
          setTasks([]);
        }
      })
      .catch(err => {
        console.error("Error:", err);
        setTasks([]);
      });
  }, []);

  const updateStatus = (id, status) => {
    API.put(`/tasks/${id}`, { status })
      .then(() => {
        alert("Updated");
        window.location.reload();
      })
      .catch(err => {
        alert("Update Failed");
        console.error(err);
      });
  };

  return (
    <div>
      <h2>My Tasks</h2>

      {/* 👉 Empty case */}
      {tasks.length === 0 && <p>No Tasks Found</p>}

      {tasks.map(t => (
        <div
          key={t.id}
          style={{
            border: "1px solid black",
            margin: "10px",
            padding: "10px"
          }}
        >
          <p><b>{t.title}</b></p>
          <p>Status: {t.status}</p>

          <button onClick={() => updateStatus(t.id, "IN_PROGRESS")}>
            Start
          </button>

          <button onClick={() => updateStatus(t.id, "DONE")}>
            Complete
          </button>
        </div>
      ))}
    </div>
  );
}

export default Tasks;