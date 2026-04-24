import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Projects from "./pages/Projects";
import Tasks from "./pages/Tasks";
import ProjectDetail from "./pages/ProjectDetail";
import CreateTask from "./pages/CreateTask";
import AdminDashboard from "./pages/AdminDashboard";

// 🔐 Simple Protected Route
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/" />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* 🔓 Public Route */}
        <Route path="/" element={<Login />} />

        {/* 🔐 Protected Routes */}
        <Route path="/admin" element={
          <PrivateRoute>
            <AdminDashboard />
          </PrivateRoute>
        } />

        <Route path="/projects" element={
          <PrivateRoute>
            <Projects />
          </PrivateRoute>
        } />

        <Route path="/tasks" element={
          <PrivateRoute>
            <Tasks />
          </PrivateRoute>
        } />

        <Route path="/project/:id" element={
          <PrivateRoute>
            <ProjectDetail />
          </PrivateRoute>
        } />

        <Route path="/create-task/:id" element={
          <PrivateRoute>
            <CreateTask />
          </PrivateRoute>
        } />

        {/* 🔁 Default fallback */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;