import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function JobDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const [job, setJob] = useState(null);
  const [message, setMessage] = useState("");
  const [applied, setApplied] = useState(false); // ✅ NEW

  useEffect(() => {
    api.get(`/jobs/${id}`).then(({ data }) => setJob(data));
  }, [id]);

  const apply = async () => {
    try {
      await api.post(`/applications/${id}`, {
        coverLetter: "Interested in this role.",
      });

      setApplied(true); // ✅ mark applied
      setMessage("Application submitted.");
    } catch (error) {
      const msg =
        error.response?.data?.message || "Unable to apply";

      setMessage(msg);

      // If backend says already applied → lock button
      if (msg.toLowerCase().includes("already")) {
        setApplied(true);
      }
    }
  };

  if (!job) return <p>Loading job...</p>;

  const canApply = user && user.role !== "recruiter";

  return (
    <div>
      <h1>{job.title}</h1>
      <p>{job.description}</p>

      {canApply && (
        <button onClick={apply} disabled={applied}>
          {applied ? "Already Applied" : "Apply"}
        </button>
      )}

      {message && <p>{message}</p>}
    </div>
  );
}