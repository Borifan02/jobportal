JobPortal 🚀

A full-stack, production-ready Job Search Platform built with the MERN Stack (MongoDB, Express.js, React, Node.js).
Designed to demonstrate modern web development, scalable architecture, authentication, and real-world job marketplace workflows.

✨ Features
🔍 Job Search & Discovery

Advanced job search with filters (location, job type, experience level, keywords)

Real-time search results with optimized queries

Save jobs for later review

🔐 Authentication & Authorization

Secure authentication using JWT

Role-based access control:

Job Seeker

Employer

Admin

OAuth-ready architecture (Google / GitHub support can be added)

👤 Candidate Dashboard

Manage personal profile and resume

Track applied jobs and application status

Save and manage favorite jobs

🏢 Employer Dashboard

Post, edit, and delete job listings

View applicants per job

Manage application stages:

Screening

Interview

Offer

Rejected

🛡️ Admin Panel

Manage users and employers

Moderate job postings

Platform-wide analytics and control

🎨 Premium UI/UX

Fully responsive (mobile, tablet, desktop)

Clean, modern design inspired by LinkedIn & Indeed

Smooth animations and transitions

Accessible and user-friendly interfaces

🛠️ Technology Stack (MERN)
Frontend

React.js (with modern hooks)

Tailwind CSS – utility-first styling

Framer Motion – animations

Lucide React – icons

Axios – API communication

TypeScript (optional but recommended)

Backend

Node.js

Express.js

MongoDB with Mongoose

JWT Authentication

bcrypt for password hashing

RESTful API architecture

Database

MongoDB Atlas (Cloud Database)

System Architecture
Client (React)
   ↓
REST API (Express + Node)
   ↓
Database (MongoDB)

Key Architectural Decisions

RESTful APIs for scalable backend communication

JWT-based authentication for stateless security

MVC-like folder structure for maintainability

Reusable UI components following best frontend practices

Environment-based configuration using .env


Clone Repository
git clone https://github.com/Borifan02/jobportal.git
cd jobportal
Backend Setup
cd backend
npm install
npm run dev

Create a .env file:
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
PORT=5000
npm run dev
Open:
👉 http://localhost:3000
📊 Deployment
Frontend

Vercel / Netlify

Backend

Render, Railway, or AWS

Database

MongoDB Atlas

⚠️ Current Limitations (Planned Improvements)

Real-time notifications (WebSockets)

Resume file upload (Cloudinary / Firebase Storage)

Advanced analytics dashboard

Email notifications (Nodemailer)

OAuth login (Google & GitHub)

🎯 Purpose of This Project

This project was built to:

Demonstrate full-stack MERN development

Showcase real-world job portal workflows

Highlight clean architecture, security, and scalability

Serve as a portfolio project for internships, freelance work, and full-time roles

👨‍💻 Author

Borifan Dabasa
Full-Stack Developer
🔗 GitHub: https://github.com/Borifan02

🔗 LinkedIn: https://www.linkedin.com/in/borifan-dabasa-a5191036b