import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="nav">
      <Link to="/" className="brand">
        Job Portal
      </Link>
      <div>
        {user ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/applications">Applications</Link>
            {user.role === "recruiter" ? <Link to="/post-job">Post Job</Link> : null}
            <button type="button" onClick={logout} className="link-button">
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