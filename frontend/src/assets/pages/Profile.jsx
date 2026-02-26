import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Profile() {
  const [form, setForm] = useState({
    name: "",
    bio: "",
    skills: "",
    location: "",
    avatarUrl: "",
    resumeUrl: "",
    github: "",
    linkedin: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  // Load profile
  useEffect(() => {
    api.get("/users/me").then(({ data }) => {
      setForm({
        name: data.name || "",
        bio: data.bio || "",
        skills: (data.skills || []).join(", "),
        location: data.location || "",
        avatarUrl: data.avatarUrl || "",
        resumeUrl: data.resumeUrl || "",
        github: data.github || "",
        linkedin: data.linkedin || "",
      });
      setLoading(false);
    });
  }, []);

  const update = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMsg("");

    try {
      await api.put("/users/me", {
        ...form,
        skills: form.skills
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
      });

      setMsg("Profile updated ✅");
    } catch (err) {
      setMsg(err.response?.data?.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Loading profile...</p>;

  return (
    <div className="card form">
      <h1>Edit Profile</h1>

      <form onSubmit={save}>
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
        />

        <textarea
          placeholder="Bio"
          value={form.bio}
          onChange={(e) => update("bio", e.target.value)}
        />

        <input
          placeholder="Skills (comma separated)"
          value={form.skills}
          onChange={(e) => update("skills", e.target.value)}
        />

        <input
          placeholder="Location"
          value={form.location}
          onChange={(e) => update("location", e.target.value)}
        />

        <input
          placeholder="Avatar URL"
          value={form.avatarUrl}
          onChange={(e) => update("avatarUrl", e.target.value)}
        />

        <input
          placeholder="Resume URL"
          value={form.resumeUrl}
          onChange={(e) => update("resumeUrl", e.target.value)}
        />

        <input
          placeholder="GitHub"
          value={form.github}
          onChange={(e) => update("github", e.target.value)}
        />

        <input
          placeholder="LinkedIn"
          value={form.linkedin}
          onChange={(e) => update("linkedin", e.target.value)}
        />

        {msg && <p>{msg}</p>}

        <button disabled={saving}>
          {saving ? "Saving..." : "Save Profile"}
        </button>
      </form>
    </div>
  );
}