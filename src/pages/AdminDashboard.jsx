import { useEffect, useState } from "react";
import {
  RefreshCw,
  LogOut,
  ClipboardList,
  Clock,
  CheckCircle2,
  AlertCircle,
  XCircle,
  MessageSquareText,
  Image,
  Download,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import api from "../api/api";

function AdminDashboard() {
  const navigate = useNavigate();

  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [adminNotes, setAdminNotes] = useState({});

  const COLORS = ["#facc15", "#38bdf8", "#22c55e", "#ef4444"];

  const formatDate = (date) => {
    if (!date) return "Not available";
    return new Date(date).toLocaleString();
  };

  const getTicketNo = (id) => {
    return `CC-2026-${String(id).padStart(4, "0")}`;
  };

  const fetchComplaints = async () => {
    const token = localStorage.getItem("token");

    try {
      setLoading(true);

      const response = await api.get("/complaints", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setComplaints(response.data);

      const notesMap = {};
      response.data.forEach((complaint) => {
        notesMap[complaint.id] = complaint.adminNote || "";
      });

      setAdminNotes(notesMap);
    } catch (error) {
      console.log(error.response?.data);
      toast.error("Admin access required!");
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  const updateComplaint = async (id, status) => {
    const token = localStorage.getItem("token");

    try {
      await api.put(
        `/complaints/${id}/status`,
        {
          status,
          adminNote: adminNotes[id] || "",
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success("Complaint updated successfully!");
      fetchComplaints();
    } catch (error) {
      console.log(error.response?.data);
      toast.error("Failed to update complaint!");
    }
  };

  const handleNoteChange = (id, value) => {
    setAdminNotes((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const exportCSV = () => {
    if (complaints.length === 0) {
      toast.error("No complaints to export!");
      return;
    }

    const headers = [
      "Ticket No",
      "Title",
      "Description",
      "Category",
      "Status",
      "Student Name",
      "Student Email",
      "Admin Note",
      "Image URL",
      "Created At",
    ];

    const rows = complaints.map((c) => [
      getTicketNo(c.id),
      c.title || "",
      c.description || "",
      c.category || "",
      c.status || "",
      c.user?.fullName || "",
      c.user?.email || "",
      c.adminNote || "",
      c.imageUrl || "",
      formatDate(c.createdAt),
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows]
        .map((row) =>
          row.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(",")
        )
        .join("\n");

    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = "campuscare_complaints_report.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success("CSV report downloaded!");
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const total = complaints.length;
  const pending = complaints.filter((c) => c.status === "PENDING").length;
  const inProgress = complaints.filter((c) => c.status === "IN_PROGRESS").length;
  const resolved = complaints.filter((c) => c.status === "RESOLVED").length;
  const rejected = complaints.filter((c) => c.status === "REJECTED").length;

  const statusData = [
    { name: "Pending", value: pending },
    { name: "In Progress", value: inProgress },
    { name: "Resolved", value: resolved },
    { name: "Rejected", value: rejected },
  ].filter((item) => item.value > 0);

  const categoryData = Object.values(
    complaints.reduce((acc, item) => {
      const category = item.category || "Other";
      acc[category] = acc[category] || { category, count: 0 };
      acc[category].count += 1;
      return acc;
    }, {})
  );

  const filteredComplaints = complaints.filter((complaint) => {
    const title = complaint.title || "";
    const description = complaint.description || "";
    const category = complaint.category || "";

    const matchesSearch =
      title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "ALL" || complaint.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="admin-page">
      <div className="admin-header">
        <div>
          <p>Admin Portal</p>
          <h1>Complaint Management</h1>
        </div>

        <div className="admin-actions">
          <button onClick={fetchComplaints}>
            <RefreshCw size={16} /> Refresh
          </button>

          <button onClick={exportCSV}>
            <Download size={16} /> Export CSV
          </button>

          <button onClick={logout}>
            <LogOut size={16} /> Logout
          </button>
        </div>
      </div>

      {loading ? (
        <div className="loading-box">
          <div className="loader"></div>
          <p>Loading complaints...</p>
        </div>
      ) : (
        <>
          <div className="stats-grid">
            <div className="stat-card">
              <ClipboardList />
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

            <div className="stat-card">
              <XCircle />
              <h2>{rejected}</h2>
              <p>Rejected</p>
            </div>
          </div>

          <div className="charts-grid">
            <div className="chart-card">
              <h3>Status Distribution</h3>
              {statusData.length === 0 ? (
                <div className="empty-box">No status data available.</div>
              ) : (
                <ResponsiveContainer width="100%" height={260}>
                  <PieChart>
                    <Pie data={statusData} dataKey="value" nameKey="name" outerRadius={90} label>
                      {statusData.map((entry, index) => (
                        <Cell key={index} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>

            <div className="chart-card">
              <h3>Complaints by Category</h3>
              {categoryData.length === 0 ? (
                <div className="empty-box">No category data available.</div>
              ) : (
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={categoryData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="category" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip />
                    <Bar dataKey="count" fill="#38bdf8" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          <div className="admin-filters">
            <input
              type="text"
              placeholder="Search complaints by title, description or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="ALL">All Status</option>
              <option value="PENDING">Pending</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="RESOLVED">Resolved</option>
              <option value="REJECTED">Rejected</option>
            </select>
          </div>

          <div className="admin-table">
            {filteredComplaints.length === 0 ? (
              <div className="empty-box">No matching complaints found.</div>
            ) : (
              filteredComplaints.map((complaint) => (
                <div className="admin-row" key={complaint.id}>
                  <div className="admin-complaint-info">
                    <h3>{complaint.title}</h3>

                    <div className="ticket-meta">
                      <span>{getTicketNo(complaint.id)}</span>
                      <span>{formatDate(complaint.createdAt)}</span>
                    </div>

                    <p>{complaint.description}</p>
                    <span>{complaint.category}</span>

                    <small>
                      Raised by: {complaint.user?.fullName || "Unknown"} |{" "}
                      {complaint.user?.email || "No email"}
                    </small>

                    {complaint.imageUrl && (
  <div className="proof-image-section">
    <a
      href={`https://campuscare-backend-rt14.onrender.com${complaint.imageUrl}`}
      target="_blank"
      rel="noreferrer"
      className="view-image-btn"
    >
      <Image size={16} /> View Proof Image
    </a>

    <img
      src={`https://campuscare-backend-rt14.onrender.com${complaint.imageUrl}`}
      alt="Complaint Proof"
      className="complaint-proof-image"
      onError={(e) => {
        e.target.style.display = "none";
      }}
    />
  </div>
)}

                    {complaint.adminNote && (
                      <div className="admin-note-preview">
                        <MessageSquareText size={16} />
                        <p>{complaint.adminNote}</p>
                      </div>
                    )}
                  </div>

                  <div className="admin-status-box">
                    <strong className={`status ${complaint.status.toLowerCase()}`}>
                      {complaint.status}
                    </strong>

                    <select
                      value={complaint.status}
                      onChange={(e) => updateComplaint(complaint.id, e.target.value)}
                    >
                      <option value="PENDING">PENDING</option>
                      <option value="IN_PROGRESS">IN_PROGRESS</option>
                      <option value="RESOLVED">RESOLVED</option>
                      <option value="REJECTED">REJECTED</option>
                    </select>

                    <textarea
                      className="admin-note-input"
                      placeholder="Add admin note..."
                      value={adminNotes[complaint.id] || ""}
                      onChange={(e) => handleNoteChange(complaint.id, e.target.value)}
                    ></textarea>

                    <button
                      className="note-save-btn"
                      onClick={() => updateComplaint(complaint.id, complaint.status)}
                    >
                      Save Note
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default AdminDashboard;