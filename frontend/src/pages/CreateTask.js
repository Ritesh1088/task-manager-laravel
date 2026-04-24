import { useEffect, useState } from "react";
import API from "../api";
import { useParams } from "react-router-dom";

function CreateTask() {
  const { id } = useParams();

  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    title: "",
    priority: "MEDIUM",
    due_date: "",
    assigned_to: ""
  });

  useEffect(() => {
    API.get("/users").then(res => {
      setUsers(res.data);
    });
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const submit = () => {
    if (!form.title || !form.due_date || !form.assigned_to) {
      alert("All fields required");
      return;
    }

    API.post("/tasks", {
      ...form,
      project_id: id
    }).then(() => {
      alert("Task Created Successfully");
      window.location.href = `/project/${id}`;
    });
  };

  return (
    <div style={{padding:"20px"}}>
      <h2>Create Task</h2>

      <input
        name="title"
        placeholder="Task Title"
        onChange={handleChange}
      />

      <br/><br/>

      <select name="priority" onChange={handleChange}>
        <option value="LOW">LOW</option>
        <option value="MEDIUM">MEDIUM</option>
        <option value="HIGH">HIGH</option>
      </select>

      <br/><br/>

      <input
        type="date"
        name="due_date"
        onChange={handleChange}
      />

      <br/><br/>

      <select name="assigned_to" onChange={handleChange}>
        <option value="">Select User</option>
        {users.map(u => (
          <option key={u.id} value={u.id}>{u.name}</option>
        ))}
      </select>

      <br/><br/>

      <button onClick={submit}>Create Task</button>
    </div>
  );
}

export default CreateTask;