import { useState } from "react";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/login", {
        email,
        password
      });

      // ✅ Save token
      localStorage.setItem("token", res.data.token);

      // ✅ Save role (IMPORTANT)
      localStorage.setItem("role", res.data.user.role);

      alert("Login Success");

      // 🔥 Role-based redirect
      if (res.data.user.role === "admin") {
        window.location.href = "/admin";
      } else {
        window.location.href = "/tasks";
      }

    } catch (err) {
      console.error(err);
      alert("Login Failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Login</h2>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;