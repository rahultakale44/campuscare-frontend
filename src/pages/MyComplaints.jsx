import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  RefreshCw,
  Search,
  MessageSquareText,
  Image,
} from "lucide-react";
import { toast } from "react-toastify";
import api from "../api/api";

function MyComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const formatDate = (date) => {
    if (!date) return "Not available";
    return new Date(date).toLocaleString();
  };

  const getTicketNo = (id) => {
    return `CC-2026-${String(id).padStart(4, "0")}`;
  };

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
      toast.error("Failed to fetch complaints!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyComplaints();
  }, []);

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
    <div className="list-page">
      <div className="list-container">
        <div className="list-header">
          <Link to="/student-dashboard" className="back-link">
            <ArrowLeft size={18} /> Back to Dashboard
          </Link>

          <button onClick={fetchMyComplaints}>
            <RefreshCw size={16} /> Refresh
          </button>
        </div>

        <h1>My Complaints</h1>
        <p>Track, search and monitor your submitted campus complaints.</p>

        <div className="student-filters">
          <div className="search-box">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search complaints..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="ALL">All Status</option>
            <option value="PENDING">Pending</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="RESOLVED">Resolved</option>
            <option value="REJECTED">Rejected</option>
          </select>
        </div>

        {loading ? (
          <div className="loading-box">
            <div className="loader"></div>
            <p>Loading your complaints...</p>
          </div>
        ) : (
          <div className="complaint-table">
            {filteredComplaints.length === 0 ? (
              <div className="empty-box">No matching complaints found.</div>
            ) : (
              filteredComplaints.map((complaint) => (
                <div className="complaint-row" key={complaint.id}>
                  <div>
                    <h3>{complaint.title}</h3>

                    <div className="ticket-meta">
                      <span>{getTicketNo(complaint.id)}</span>
                      <span>{formatDate(complaint.createdAt)}</span>
                    </div>

                    <p>{complaint.description}</p>
                    <span>{complaint.category}</span>

                    {complaint.imageUrl && (
                      <div className="proof-image-section">
                        <a
                          href={complaint.imageUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="view-image-btn"
                        >
                          <Image size={16} /> View Uploaded Image
                        </a>

                        <img
                          src={complaint.imageUrl}
                          alt="Complaint Proof"
                          className="complaint-proof-image"
                        />
                      </div>
                    )}

                    {complaint.adminNote && (
                      <div className="student-note-box">
                        <MessageSquareText size={16} />
                        <p>
                          <b>Admin Note:</b> {complaint.adminNote}
                        </p>
                      </div>
                    )}
                  </div>

                  <strong className={`status ${complaint.status.toLowerCase()}`}>
                    {complaint.status}
                  </strong>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyComplaints;