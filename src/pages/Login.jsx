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

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      const { token, role } = response.data;

      if (role !== "STUDENT") {
        toast.error("Please use administrator access.");
        return;
      }

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      toast.success("Login Successful!");

      setTimeout(() => {
        navigate("/student-dashboard", { replace: true });
      }, 800);
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
      <Link to="/admin-login" className="floating-admin-btn">
        Administrator Access
      </Link>

      <div className="auth-card">
        <h1>Student Login</h1>
        <p>Login or create your CampusCare student account</p>

        <div className="login-type-buttons">
          <button type="button" onClick={handleStudentLogin}>
            Demo Student Login
          </button>
        </div>

        <form onSubmit={handleLogin} autoComplete="off">
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Enter password"
            value={password}
            autoComplete="new-password"
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