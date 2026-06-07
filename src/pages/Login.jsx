import { toast } from "react-toastify";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/api";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleStudentLogin = () => {
    setEmail("dileeptakale@gmail.com");
    setPassword("123456");
  };

  const handleAdminLogin = () => {
    setEmail("admin@campuscare.com");
    setPassword("admin123");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      const { token, role } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      toast.success("Login Successful!");

      setTimeout(() => {
        if (role === "ADMIN") {
          navigate("/admin-dashboard", { replace: true });
        } else if (role === "STUDENT") {
          navigate("/student-dashboard", { replace: true });
        } else {
          toast.error("Invalid role received!");
        }
      }, 1000);

    } catch (error) {
      console.log(error.response?.data);

      toast.error(
        error.response?.data?.message ||
        "Login Failed! Check email or password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Welcome Back</h1>
        <p>Select login type or enter your credentials</p>

        <div className="login-type-buttons">
          <button type="button" onClick={handleStudentLogin}>
            Student Login
          </button>

          <button type="button" onClick={handleAdminLogin}>
            Admin Login
          </button>
        </div>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Logging In..." : "Login"}
          </button>
        </form>

        <span>
          New student? <Link to="/register">Create account</Link>
        </span>
      </div>
    </div>
  );
}

export default Login;