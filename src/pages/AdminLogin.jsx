import { toast } from "react-toastify";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/api";

function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

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

      if (role !== "ADMIN") {
        toast.error("Admin access only!");
        return;
      }

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      toast.success("Admin Login Successful!");

      setTimeout(() => {
        navigate("/admin-dashboard", { replace: true });
      }, 800);
    } catch (error) {
      console.log(error.response?.data);

      toast.error(
        error.response?.data?.message ||
          "Admin Login Failed! Check email or password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Admin Login</h1>
        <p>Restricted access for CampusCare administrators</p>

        <div className="login-type-buttons">
          <button type="button" onClick={handleAdminLogin}>
            Fill Admin Credentials
          </button>
        </div>

        <form onSubmit={handleLogin} autoComplete="off">
          <input
            type="email"
            placeholder="Admin email"
            value={email}
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Admin password"
            value={password}
            autoComplete="new-password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Logging In..." : "Login as Admin"}
          </button>
        </form>

        <span>
          Student? <Link to="/login">Go to student login</Link>
        </span>
      </div>
    </div>
  );
}

export default AdminLogin;