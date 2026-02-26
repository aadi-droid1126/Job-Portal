![MERN](https://img.shields.io/badge/Stack-MERN-green)
![Status](https://img.shields.io/badge/Status-Production--Ready-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)
![Made By](https://img.shields.io/badge/Made%20By-Aditya%20Sharma-orange)

# 💼 Job Portal — Full Stack MERN Application

A **production-style job portal** built with the MERN stack that simulates real-world hiring workflows including recruiter dashboards, live search, personalized job saving, and polished UX interactions.

Designed as a **portfolio-grade full-stack system** showcasing scalable backend architecture, secure authentication, and modern frontend UX patterns.

---

## 🚀 Live Capabilities

### 👤 Authentication & Roles

- JWT-based authentication
- Role-based access control (Applicant / Recruiter)
- Protected routes & API guards

### 🧑‍💼 Recruiter System

- Post jobs with structured metadata
- Recruiter dashboard with job management
- Delete jobs with real-time UI updates
- Candidate shortlisting system

### 🔍 Smart Job Discovery

- Live keyword search (debounced)
- Backend-powered filtering system
- Saved jobs bookmarking
- Personalized job feeds

### ⭐ Personalization Features

- Save / unsave jobs
- Recruiter shortlists with notes
- Public user profiles
- Profile enrichment (skills, links, bio)

### ✨ Premium UX Features

- Skeleton loaders for smooth loading states
- Toast notifications (react-hot-toast)
- Micro-interactions & hover animations
- Empty-state UI polish

---

## 🧠 Architecture Highlights

- Modular Express architecture (controllers, services, middleware)
- RESTful API design
- JWT auth with middleware guards
- MongoDB relational modeling (Users ↔ Jobs ↔ Applications)
- Compatibility layer for scalable API evolution
- Clean separation of frontend & backend concerns

---

## 🛠 Tech Stack

### 🎨 Frontend

- React (Vite)
- React Router DOM
- Axios
- Context API (Auth state)
- Skeleton loaders + Toast UX

### ⚙️ Backend

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Role-based Middleware
- Modular Service Layer

### ☁️ Database

- MongoDB Atlas (Cloud-ready)

---

## 📂 Project Structure

./.vscode/settings.json
./backend/.env
./backend/.gitignore
./backend/config/db.js
./backend/constants/roles.js
./backend/controllers/applicationController.js
./backend/controllers/authController.js
./backend/controllers/jobController.js
./backend/controllers/userController.js
./backend/docs/api.md
./backend/middleware/authMiddleware.js
./backend/middleware/errorMiddleware.js
./backend/middleware/notFoundMiddleware.js
./backend/middleware/roleMiddleware.js
./backend/models/Application.js
./backend/models/Job.js
./backend/models/User.js
./backend/package-lock.json
./backend/package.json
./backend/routes/applicationRoutes.js
./backend/routes/authRoutes.js
./backend/routes/jobRoutes.js
./backend/routes/userRoutes.js
./backend/server.js
./backend/services/applicationService.js
./backend/services/authService.js
./backend/services/jobService.js
./backend/utils/generateToken.js
./backend/utils/validators.js
./frontend/.env
./frontend/.gitignore
./frontend/index.html
./frontend/package-lock.json
./frontend/package.json
./frontend/postcss.config.js
./frontend/public/logo.svg
./frontend/src/App.jsx
./frontend/src/index.css
./frontend/src/main.jsx
./frontend/tailwind.config.js
./frontend/vite.config.js
./open-browser.js
./package-lock.json
./package.json
./README.md
./scripts/dev-runner.js
./scripts/doctor.js

---

## 🎯 Key Engineering Highlights

- Built with **scalable folder architecture**
- Designed with **real hiring platform workflows**
- Implements **production-grade UX polish**
- Demonstrates **full-stack ownership**
- Portfolio-focused **clean codebase**

---

## 📸 Screenshots

> Add screenshots here:

- Home with skeleton loading
- Recruiter dashboard
- Saved jobs page
- Profile page

---

## ⚙️ Getting Started

### 1️⃣ Clone Repository

```bash
git clone https://github.com/aadi-droid1126/job-portal.git
cd job-portal

👨‍💻 Author

Aditya Sharma

GitHub: https://github.com/aadi-droid1126

LinkedIn: https://linkedin.com/in/aaditya-sharma-/
💼 Resume Bullet

Full-stack MERN Job Portal

Built a production-style job portal with recruiter dashboards, live search, skeleton loaders, and personalized workflows using MERN stack, implementing JWT authentication and modular backend architecture.

---

# 🏆 What this README just did

This transforms your repo into:
- Recruiter-friendly
- Professional
- Authority-building

It now signals:
> “This dev understands full-stack systems”

---

# 🚀 Next (Step 2 of Bucket G)

Now we optimize **GitHub positioning**:
- Repo name
- Description
- Tags
- Pin strategy

This massively boosts profile impact.

Say:
**optimize repo** 🚀
```
