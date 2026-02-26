import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";

export default function Dashboard() {
  const { user } = useAuth();
  const role = user?.role;
  const name = user?.name || "User";

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  // ⭐ Fetch ONLY recruiter jobs
  useEffect(() => {
    if (role !== "recruiter") return;

    const fetchJobs = async () => {
      try {
        setLoading(true);
        const { data } = await api.get("/jobs");

        const allJobs = data.data || data;

        // ⭐ Filter jobs created by current recruiter
        const myJobs = allJobs.filter(
          (job) => job.createdBy?._id === user?.id
        );

        setJobs(myJobs);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load jobs");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [role, user?.id]);

  // 🗑 Delete Job
  const deleteJob = async (id) => {
    if (!confirm("Delete this job?")) return;

    try {
      await api.delete(`/jobs/${id}`);

      setJobs((prev) => prev.filter((job) => job._id !== id));

      toast.success("Job deleted");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete job");
    }
  };

  return (
    <section>
      <h1>
        {role === "recruiter"
          ? "Recruiter Dashboard"
          : "Applicant Dashboard"}
      </h1>

      <p>Welcome, {name}</p>

      {/* ================= RECRUITER ================= */}
      {role === "recruiter" ? (
        <>
          <div className="card">
            <p>Manage your job postings and applicants.</p>
            <Link to="/post-job">➕ Post a new job</Link>
          </div>

          <h2 style={{ marginTop: "1.5rem" }}>Your Jobs</h2>

          {loading ? (
            <p>Loading your jobs...</p>
          ) : jobs.length === 0 ? (
            <p>You haven't posted any jobs yet.</p>
          ) : (
            <div className="grid">
              {jobs.map((job) => (
                <div key={job._id} className="card">
                  <h3>{job.title}</h3>
                  <p>
                    {job.company} · {job.location}
                  </p>

                  <div
                    style={{
                      marginTop: "0.5rem",
                      display: "flex",
                      gap: "10px",
                    }}
                  >
                    <Link to={`/jobs/${job._id}`}>View</Link>

                    <button
                      onClick={() => deleteJob(job._id)}
                      style={{
                        background: "transparent",
                        border: "none",
                        color: "red",
                        cursor: "pointer",
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        /* ================= APPLICANT ================= */
        <div className="card">
          <p>Browse jobs and apply quickly.</p>
          <Link to="/">Browse jobs</Link>
        </div>
      )}
    </section>
  );
}