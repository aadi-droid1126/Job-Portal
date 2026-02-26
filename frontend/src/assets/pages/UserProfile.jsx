import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function UserProfile() {
  const { id } = useParams();
  const { user: currentUser } = useAuth();

  const [user, setUser] = useState(null);
  const [msg, setMsg] = useState("");
  const [shortlisted, setShortlisted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.get(`/users/${id}`).then(({ data }) => setUser(data));

    // check shortlist state
    api.get("/users/shortlist").then(({ data }) => {
      const exists = data.some((u) => u._id === id);
      setShortlisted(exists);
    });
  }, [id]);

  const toggleShortlist = async () => {
    try {
      setLoading(true);

      if (shortlisted) {
        await api.delete(`/users/shortlist/${id}`);
        setShortlisted(false);
        setMsg("Removed from shortlist");
      } else {
        await api.post(`/users/shortlist/${id}`);
        setShortlisted(true);
        setMsg("Candidate shortlisted ⭐");
      }
    } catch (err) {
      setMsg(err.response?.data?.message || "Action failed");
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <p>Loading profile...</p>;

  const isRecruiter = currentUser?.role === "recruiter";
  const isSelf = currentUser?._id === id;

  return (
    <div className="card">
      <h1>{user.name}</h1>

      {user.avatarUrl && (
        <img
          src={user.avatarUrl}
          alt="avatar"
          style={{ width: 100, borderRadius: "50%" }}
        />
      )}

      {user.bio && <p>{user.bio}</p>}
      {user.location && <p>📍 {user.location}</p>}

      {user.skills?.length > 0 && (
        <div>
          <h3>Skills</h3>
          <p>{user.skills.join(", ")}</p>
        </div>
      )}

      {user.github && (
        <p>
          GitHub:{" "}
          <a href={user.github} target="_blank" rel="noreferrer">
            {user.github}
          </a>
        </p>
      )}

      {user.linkedin && (
        <p>
          LinkedIn:{" "}
          <a href={user.linkedin} target="_blank" rel="noreferrer">
            {user.linkedin}
          </a>
        </p>
      )}

      {user.resumeUrl && (
        <p>
          <a href={user.resumeUrl} target="_blank" rel="noreferrer">
            View Resume
          </a>
        </p>
      )}

      {/* ⭐ SHORTLIST BUTTON */}
      {isRecruiter && !isSelf && (
        <button
          onClick={toggleShortlist}
          disabled={loading}
          style={{ marginTop: 10 }}
        >
          {shortlisted ? "★ Remove from Shortlist" : "☆ Shortlist Candidate"}
        </button>
      )}

      {msg && <p>{msg}</p>}
    </div>
  );
}