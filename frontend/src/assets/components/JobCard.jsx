import { Link } from "react-router-dom";

export default function JobCard({ job }) {
  return (
    <article className="card">
      <h3>{job.title}</h3>
      <p>
        {job.company} · {job.location}
      </p>
      <Link to={`/jobs/${job._id}`}>View details</Link>
    </article>
  );
}