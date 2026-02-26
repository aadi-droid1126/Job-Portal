import { useEffect, useState } from "react";
import JobCard from "../components/JobCard";
import api from "../api/axios.jsx";
import SkeletonCard from "../components/SkeletonCard";

export default function Home() {
  const [jobs, setJobs] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch jobs
  const fetchJobs = async (search = "") => {
    try {
      setLoading(true);

      const { data } = await api.get(
        search ? `/jobs?keyword=${encodeURIComponent(search)}` : "/jobs"
      );

      if (Array.isArray(data)) {
        setJobs(data);
        setMeta(null);
      } else {
        setJobs(data.data || []);
        setMeta(data.meta || null);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchJobs();
  }, []);

  // 🔍 Live search debounce
  useEffect(() => {
    const delay = setTimeout(() => {
      fetchJobs(keyword);
    }, 400);
    return () => clearTimeout(delay);
  }, [keyword]);

  return (
    <section>
      <h1>Open Jobs</h1>

      {/* 🔍 Search */}
      <input
        type="text"
        placeholder="Search jobs, company, location..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        style={{
          padding: "10px",
          margin: "12px 0",
          width: "100%",
          maxWidth: "400px",
          borderRadius: "8px",
        }}
      />

      {meta && (
        <p style={{ fontSize: "0.9rem", opacity: 0.7 }}>
          Showing {jobs.length} of {meta.total} jobs
        </p>
      )}

      {/* 🧊 Skeletons */}
      <div className="grid">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))
          : jobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
      </div>
    </section>
  );
}