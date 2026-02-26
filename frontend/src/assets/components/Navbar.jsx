import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout, ready } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!ready) return null;

  return (
    <nav className="nav">
      <Link to="/" className="brand">
        HireFlow
      </Link>

      <div>
        {user ? (
          <>
            <Link to="/dashboard">Dashboard</Link>

            {/* 👤 PROFILE */}
            <Link to="/profile">Profile</Link>

            {/* 📩 APPLICATIONS */}
            <Link to="/applications">Applications</Link>

            {/* 👥 RECRUITER DIRECTORY */}
            <Link to="/recruiters">Recruiters</Link>

            {/* ⭐ RECRUITER ONLY LINKS */}
            {user.role === "recruiter" && (
              <>
                <Link to="/post-job">Post Job</Link>
                <Link to="/shortlist">Shortlist</Link>
              </>
            )}

            <button
              type="button"
              onClick={handleLogout}
              className="link-button"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}