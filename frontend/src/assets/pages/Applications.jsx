import { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../hooks/useAuth";

export default function Applications() {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const endpoint = user?.role === "recruiter" ? "/applications/recruiter" : "/applications/mine";
    api.get(endpoint).then(({ data }) => setApplications(data));
  }, [user]);

  return (
    <section>
      <h1>{user?.role === "recruiter" ? "Received Applications" : "My Applications"}</h1>
      <div className="grid">
        {applications.map((application) => (
          <article key={application._id} className="card">
            <h3>{application.job?.title}</h3>
            <p>{application.job?.company}</p>
            {user?.role === "recruiter" ? <p>Applicant: {application.applicant?.name}</p> : null}
          </article>
        ))}
      </div>
    </section>
  );
}