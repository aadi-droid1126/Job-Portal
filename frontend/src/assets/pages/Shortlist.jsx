import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Shortlist() {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadShortlist = async () => {
    try {
      const { data } = await api.get("/users/shortlist");
      setCandidates(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadShortlist();
  }, []);

  const remove = async (id) => {
    await api.delete(`/users/shortlist/${id}`);
    setCandidates((prev) => prev.filter((c) => c.user._id !== id));
  };

  const updateNote = async (id, note) => {
    await api.put(`/users/shortlist/${id}`, { note });
  };

  if (loading) return <p>Loading shortlist...</p>;

  return (
    <section>
      <h1>⭐ Shortlisted Candidates</h1>

      <div className="grid">
        {candidates.map(({ user, note }) => (
          <div key={user._id} className="card">
            <h3>{user.name}</h3>
            <p>{user.email}</p>

            {user.location && <p>📍 {user.location}</p>}

            <textarea
              placeholder="Private notes..."
              defaultValue={note}
              onBlur={(e) => updateNote(user._id, e.target.value)}
              style={{ width: "100%", marginTop: 10 }}
            />

            <button
              onClick={() => remove(user._id)}
              style={{ marginTop: 10 }}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}