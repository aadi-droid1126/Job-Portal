import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../hooks/useAuth";

export default function JobDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const [job, setJob] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    api.get(`/jobs/${id}`).then(({ data }) => setJob(data));
  }, [id]);

  const apply = async () => {
    try {
      await api.post(`/applications/${id}`, { coverLetter: "Interested in this role." });
      setMessage("Application submitted.");
    } catch (error) {
      setMessage(error.response?.data?.message || "Unable to apply");
    }
  };

    if (!job) {
      return <p>Loading job...</p>;
    }
  
    return (
      <div>
        <h1>{job.title}</h1>
        <p>{job.description}</p>
        <button onClick={apply}>Apply</button>
        {message && <p>{message}</p>}
      </div>
    );
  }