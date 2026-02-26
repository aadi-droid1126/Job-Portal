import { Link } from "react-router-dom";
import { useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast"; // ⭐ NEW

export default function JobCard({ job }) {
  const { user } = useAuth();
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleSave = async () => {
    if (!user) {
      toast.error("Login to save jobs");
      return;
    }

    try {
      setLoading(true);
      const res = await api.post(`/users/save/${job._id}`);
      setSaved(res.data.saved);

      if (res.data.saved) {
        toast.success("Job saved ⭐");
      } else {
        toast("Removed from saved");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to save job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <article className="card" style={{ position: "relative" }}>
      {/* ⭐ Bookmark Button */}
      <button
        onClick={toggleSave}
        disabled={loading}
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          background: "none",
          border: "none",
          fontSize: "1.2rem",
          cursor: "pointer",
        }}
        title="Save job"
      >
        {saved ? "⭐" : "☆"}
      </button>

      <h3>{job.title}</h3>
      <p>
        {job.company} · {job.location}
      </p>

      <Link to={`/jobs/${job._id}`}>View details</Link>
    </article>
  );
}