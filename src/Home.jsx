import { Link } from "react-router-dom";
import { ArrowRight, Building2, ShieldCheck, BarChart3, Users } from "lucide-react";
import "./App.css";

function Home() {
  return (
    <div className="home">
      <div className="grid-bg"></div>

      <nav className="topbar">
        <div className="brand">
          <div className="brand-box">
            <Building2 size={22} />
          </div>
          <span>CampusCare</span>
        </div>

        <div className="menu">
          <a>Platform</a>
          <a>Analytics</a>
          <a>Security</a>
        </div>

        <button className="top-btn">
          Launch Portal <ArrowRight size={16} />
        </button>
      </nav>

      <section className="main-hero">
        <div className="hero-text">
          <div className="badge">Smart Campus Complaint System</div>

          <h1>
            One Platform.
            <br />
            Every Campus Issue.
            <br />
            <span>Resolved Faster.</span>
          </h1>

          <p>
            A secure role-based complaint management system for students and
            admins with JWT authentication, live tracking and analytics.
          </p>
<div className="buttons">
  <Link className="primary" to="/login">
    Login to Portal
  </Link>

  <Link className="secondary" to="/register">
    Create Account
  </Link>
</div>

          <div className="mini-stats">
            <div><b>1.2k+</b><span>Issues tracked</span></div>
            <div><b>95%</b><span>Resolution rate</span></div>
            <div><b>24/7</b><span>Access</span></div>
          </div>
        </div>

        <div className="hero-panel">
          <div className="panel-card">
            <div className="panel-head">
              <div>
                <p>Admin Dashboard</p>
                <h2>Campus Overview</h2>
              </div>
              <span>Live</span>
            </div>

            <div className="cards">
              <div><BarChart3 /><h3>128</h3><p>Total</p></div>
              <div><Users /><h3>32</h3><p>Pending</p></div>
              <div><ShieldCheck /><h3>96</h3><p>Resolved</p></div>
            </div>

            <div className="ticket pending">
              <b>Water Cooler Not Working</b>
              <p>Infrastructure • Pending</p>
            </div>

            <div className="ticket progress">
              <b>WiFi Connectivity Issue</b>
              <p>Network • In Progress</p>
            </div>

            <div className="ticket resolved">
              <b>Projector Fixed</b>
              <p>Classroom • Resolved</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;