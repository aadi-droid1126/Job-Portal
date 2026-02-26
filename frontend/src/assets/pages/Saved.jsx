import { useEffect, useState } from "react";
import api from "../api/axios";
import JobCard from "../components/JobCard";
import toast from "react-hot-toast";

export default function Saved() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSaved = async () => {
    try {
      const { data } = await api.get("/users/saved");
      setJobs(data || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load saved jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSaved();
  }, []);

  if (loading) {
    return (
      <section>
        <h1>⭐ Saved Jobs</h1>
        <p>Loading your saved jobs...</p>
      </section>
    );
  }

  return (
    <section>
      <h1>⭐ Saved Jobs</h1>

      {jobs.length === 0 ? (
        <div
          className="card"
          style={{
            textAlign: "center",
            padding: "2rem",
            marginTop: "1rem",
          }}
        >
          <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>⭐</div>
          <h3>No saved jobs yet</h3>
          <p style={{ opacity: 0.7 }}>
            Start bookmarking jobs and build your personal shortlist.
          </p>
        </div>
      ) : (
        <div className="grid">
          {jobs.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      )}
    </section>
  );
}