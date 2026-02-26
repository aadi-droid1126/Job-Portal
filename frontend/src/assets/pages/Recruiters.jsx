import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";

export default function Recruiters() {
  const [recruiters, setRecruiters] = useState([]);

  useEffect(() => {
    api.get("/users").then(({ data }) => {
      const onlyRecruiters = data.filter(
        (user) => user.role === "recruiter"
      );
      setRecruiters(onlyRecruiters);
    });
  }, []);

  return (
    <section>
      <h1>Recruiters</h1>

      <div className="grid">
        {recruiters.map((r) => (
          <article key={r._id} className="card">
            {r.avatarUrl && (
              <img
                src={r.avatarUrl}
                alt="avatar"
                style={{ width: 60, borderRadius: "50%" }}
              />
            )}

            <h3>{r.name}</h3>

            {r.bio && <p>{r.bio}</p>}

            <Link to={`/profile/${r._id}`}>View Profile</Link>
          </article>
        ))}
      </div>
    </section>
  );
}