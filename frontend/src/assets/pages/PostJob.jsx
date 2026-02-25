import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function PostJob() {
  const [form, setForm] = useState({ title: "", company: "", location: "", description: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    await api.post("/jobs", form);
    setMessage("Job posted successfully.");
    setTimeout(() => navigate("/dashboard"), 900);
  };

  return (
    <form className="card form" onSubmit={handleSubmit}>
      <h1>Post a Job</h1>
      <input placeholder="Title" required onChange={(e) => setForm({ ...form, title: e.target.value })} />
      <input placeholder="Company" required onChange={(e) => setForm({ ...form, company: e.target.value })} />
      <input placeholder="Location" required onChange={(e) => setForm({ ...form, location: e.target.value })} />
      <textarea placeholder="Description" rows={6} required onChange={(e) => setForm({ ...form, description: e.target.value })} />
      {message ? <p>{message}</p> : null}
      <button type="submit">Create Job</button>
    </form>
  );
}