import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <section>
      <h1>{user?.role === "recruiter" ? "Recruiter Dashboard" : "Applicant Dashboard"}</h1>
      <p>Welcome, {user?.name}</p>
      {user?.role === "recruiter" ? (
        <div className="card">
          <p>Post jobs and review incoming applications.</p>
          <Link to="/post-job">Post a new job</Link>
        </div>
      ) : (
        <div className="card">
          <p>Browse jobs and apply quickly.</p>
          <Link to="/">Browse jobs</Link>
        </div>
      )}
    </section>
  );
}