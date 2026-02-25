import { useEffect, useState } from "react";
import JobCard from "../components/JobCard";
import api from "../api/axios";

export default function Home() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    api.get("/jobs").then(({ data }) => setJobs(data));
  }, []);

  return (
    <section>
      <h1>Open Jobs</h1>
      <div className="grid">{jobs.map((job) => <JobCard key={job._id} job={job} />)}</div>
    </section>
  );
}