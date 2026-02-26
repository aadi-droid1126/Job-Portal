import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import PostJob from "../pages/PostJob";
import JobDetails from "../pages/JobDetails";
import Applications from "../pages/Applications";
import Profile from "../pages/Profile";
import UserProfile from "../pages/UserProfile";
import Recruiters from "../pages/Recruiters";
import Shortlist from "../pages/Shortlist";
import Saved from "../pages/Saved";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/jobs/:id" element={<JobDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Public profile */}
      <Route
        path="/profile/:id"
        element={
          <ProtectedRoute>
            <UserProfile />
          </ProtectedRoute>
        }
      />

      {/* Recruiter directory */}
      <Route
        path="/recruiters"
        element={
          <ProtectedRoute>
            <Recruiters />
          </ProtectedRoute>
        }
      />

      {/* Shortlist */}
      <Route
        path="/shortlist"
        element={
          <ProtectedRoute role="recruiter">
            <Shortlist />
          </ProtectedRoute>
        }
      />

      {/* ⭐ Saved Jobs */}
      <Route
        path="/saved"
        element={
          <ProtectedRoute>
            <Saved />
          </ProtectedRoute>
        }
      />

      {/* Protected routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/post-job"
        element={
          <ProtectedRoute role="recruiter">
            <PostJob />
          </ProtectedRoute>
        }
      />

      <Route
        path="/applications"
        element={
          <ProtectedRoute>
            <Applications />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}