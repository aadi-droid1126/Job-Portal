import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../hooks/useAuth";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "applicant" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      const { data } = await api.post("/auth/register", form);
      login(data);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <form className="card form" onSubmit={handleSubmit}>
      <h1>Create account</h1>
      <input placeholder="Name" required onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Email" type="email" required onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input placeholder="Password" type="password" required onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
        <option value="applicant">Applicant</option>
        <option value="employer">Employer</option>
      </select>
      {error && <p className="error">{error}</p>}
      <button type="submit">Register</button>
    </form>
  );
}