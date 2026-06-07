# CampusCare – Smart Campus Complaint Management System

## Overview

CampusCare is a full-stack complaint management platform designed to streamline the reporting, tracking, and resolution of campus-related issues. The system enables students to submit complaints with supporting evidence while providing administrators with a centralized dashboard to manage and resolve reported issues efficiently.

The platform improves communication between students and campus administration by offering a transparent complaint lifecycle from submission to resolution.

---

## Key Features

### Student Portal

* Secure student registration and login using JWT authentication.
* Submit complaints with title, description, category, and proof image.
* Track complaint status in real-time.
* View personal complaint history.
* Receive administrator updates and notes.
* Responsive and modern user interface.

### Administrator Portal

* Secure administrator authentication.
* View all complaints from a centralized dashboard.
* Update complaint status:

  * Pending
  * In Progress
  * Resolved
  * Rejected
* Add administrative notes and feedback.
* Monitor complaint statistics through visual charts.
* Export complaint reports as CSV files.
* Filter and search complaints efficiently.

### Complaint Categories

* Infrastructure
* Network & WiFi
* Hostel
* Library
* Classroom
* Laboratory
* Water Supply
* Electricity
* Other Campus Facilities

---

## Technology Stack

### Frontend

* React.js
* React Router DOM
* Axios
* React Toastify
* Recharts
* Lucide React Icons
* CSS3

### Backend

* Java
* Spring Boot
* Spring Security
* JWT Authentication
* Spring Data JPA
* Hibernate

### Database

* MySQL

### Deployment

* Frontend: Vercel
* Backend: Render
* Database: Railway MySQL

---

## System Architecture

Student
↓
React Frontend
↓
REST APIs
↓
Spring Boot Backend
↓
MySQL Database

Administrator
↓
Admin Dashboard
↓
Complaint Management & Analytics

---

## Authentication & Authorization

CampusCare implements Role-Based Access Control (RBAC).

### Student

* Register account
* Login
* Create complaints
* View personal complaints

### Admin

* Access admin dashboard
* Manage all complaints
* Update status
* Add notes
* Export reports

Authentication is secured using JWT tokens and Spring Security.

---

## Complaint Workflow

1. Student submits complaint.
2. Complaint is stored in MySQL database.
3. Administrator reviews complaint.
4. Status updated to:

   * Pending
   * In Progress
   * Resolved
   * Rejected
5. Student can track updates from dashboard.

---

## Dashboard Analytics

The administrator dashboard provides:

* Total Complaints
* Pending Complaints
* Complaints In Progress
* Resolved Complaints
* Rejected Complaints
* Status Distribution Pie Chart
* Complaint Category Analysis

---

## Sample Use Cases

### Projector Malfunction During Examination

Students report a projector failure affecting an examination session. The administrator reviews the issue, assigns maintenance personnel, and updates the complaint after resolution.

### Campus WiFi Connectivity Issue

Students report network outages in academic blocks. The IT support team investigates and restores connectivity.

### Hostel Water Leakage

Students report continuous water leakage in hostel facilities. Maintenance staff inspect and repair the damaged pipeline.

---

## Future Enhancements

* Email Notifications
* SMS Alerts
* Complaint Prioritization
* AI-Based Complaint Categorization
* Real-Time Chat Support
* Mobile Application
* Cloud Image Storage (AWS S3 / Cloudinary)
* Multi-Campus Support

---

## Learning Outcomes

This project demonstrates practical implementation of:

* Full-Stack Web Development
* REST API Development
* JWT Authentication
* Role-Based Access Control
* Database Design
* Spring Security
* Frontend-Backend Integration
* Deployment and Cloud Hosting

---

## Author

Rahul Takale

B.Tech Computer Science Engineering
MIT Art, Design & Technology University, Pune

LinkedIn: [www.linkedin.com/in/rahul-takale-798714272](http://www.linkedin.com/in/rahul-takale-798714272)

GitHub: github.com/rahultakale44

---

## Project Status

Completed and deployed as a functional Full-Stack Campus Complaint Management System.
