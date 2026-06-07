import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  PlusCircle,
  ListChecks,
  LogOut,
  User,
  Clock,
  CheckCircle2,
  AlertCircle,
  Activity,
  Sparkles,
} from "lucide-react";
import api from "../api/api";

function StudentDashboard() {
  const navigate = useNavigate();

  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyComplaints = async () => {
    const token = localStorage.getItem("token");

    try {
      setLoading(true);

      const response = await api.get("/complaints/my", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setComplaints(response.data);
    } catch (error) {
      console.log(error.response?.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyComplaints();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  const total = complaints.length;
  const pending = complaints.filter((c) => c.status === "PENDING").length;
  const inProgress = complaints.filter((c) => c.status === "IN_PROGRESS").length;
  const resolved = complaints.filter((c) => c.status === "RESOLVED").length;

  const recentComplaints = complaints.slice(-3).reverse();

  const resolvedPercentage =
    total === 0 ? 0 : Math.round((resolved / total) * 100);

  const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <div className="dashboard-page">
      <aside className="sidebar">
        <h2>CampusCare</h2>

        <nav>
          <Link to="/student-dashboard">
            <User size={18} /> Dashboard
          </Link>

          <Link to="/create-complaint">
            <PlusCircle size={18} /> Create Complaint
          </Link>

          <Link to="/my-complaints">
            <ListChecks size={18} /> My Complaints
          </Link>
        </nav>

        <button onClick={handleLogout}>
          <LogOut size={18} /> Logout
        </button>
      </aside>

      <main className="dashboard-content">
        <div className="dashboard-header">
          <div>
            <p>Student Portal</p>
            <h1>Welcome to CampusCare</h1>
          </div>
        </div>

        {loading ? (
          <div className="loading-box">
            <div className="loader"></div>
            <p>Loading your dashboard...</p>
          </div>
        ) : (
          <>
            <div className="welcome-card">
              <div>
                <p>
                  <Sparkles size={18} /> {getGreeting()}
                </p>
                <h2>Your complaint dashboard is ready.</h2>
                <span>
                  Track your campus issues, monitor progress and stay updated.
                </span>
              </div>

              <div className="progress-ring">
                <h3>{resolvedPercentage}%</h3>
                <p>Resolved</p>
              </div>
            </div>

            <div className="stats-grid">
              <div className="stat-card">
                <ListChecks />
                <h2>{total}</h2>
                <p>Total Complaints</p>
              </div>

              <div className="stat-card">
                <Clock />
                <h2>{pending}</h2>
                <p>Pending</p>
              </div>

              <div className="stat-card">
                <AlertCircle />
                <h2>{inProgress}</h2>
                <p>In Progress</p>
              </div>

              <div className="stat-card">
                <CheckCircle2 />
                <h2>{resolved}</h2>
                <p>Resolved</p>
              </div>
            </div>

            <div className="dashboard-grid">
              <div className="dash-card">
                <h3>Create Complaint</h3>
                <p>
                  Raise a new campus issue with title, category and description.
                </p>
                <Link to="/create-complaint">Create Now</Link>
              </div>

              <div className="dash-card">
                <h3>My Complaints</h3>
                <p>Track all your submitted complaints and current status.</p>
                <Link to="/my-complaints">View Complaints</Link>
              </div>

              <div className="dash-card">
                <h3>Status Tracking</h3>
                <p>
                  Check whether your complaint is pending, in progress or
                  resolved.
                </p>
              </div>
            </div>

            <div className="recent-section">
              <div className="recent-header">
                <h2>Recent Complaints</h2>
                <Link to="/my-complaints">View All</Link>
              </div>

              {recentComplaints.length === 0 ? (
                <div className="empty-box">No complaints submitted yet.</div>
              ) : (
                <div className="recent-list">
                  {recentComplaints.map((complaint) => (
                    <div className="recent-card" key={complaint.id}>
                      <div>
                        <h3>{complaint.title}</h3>
                        <p>{complaint.description}</p>
                        <span>{complaint.category}</span>
                      </div>

                      <strong
                        className={`status ${complaint.status.toLowerCase()}`}
                      >
                        {complaint.status}
                      </strong>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="activity-section">
              <div className="recent-header">
                <h2>Recent Activity</h2>
                <Activity size={22} />
              </div>

              {recentComplaints.length === 0 ? (
                <div className="empty-box">No recent activity found.</div>
              ) : (
                <div className="activity-list">
                  {recentComplaints.map((complaint) => (
                    <div className="activity-item" key={complaint.id}>
                      <div className="activity-dot"></div>
                      <p>
                        <b>{complaint.title}</b> is currently{" "}
                        <span>{complaint.status}</span>
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default StudentDashboard;