import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast"; // ⭐ NEW

export default function Register() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "applicant",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data } = await api.post("/auth/register", form);

      const token = data.token || data?.data?.token;
      const role = data.user?.role || data.role || form.role;

      if (!token) throw new Error("Invalid server response");

      login({ token, role });

      // ⭐ Success toast
      toast.success("Account created 🎉");

      navigate("/");
    } catch (err) {
      console.error(err);

      const message =
        err.response?.data?.message ||
        err.message ||
        "Registration failed";

      setError(message);

      // ⭐ Error toast
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card form">
      <h1>Create account</h1>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          required
          onChange={(e) => handleChange("name", e.target.value)}
        />

        <input
          placeholder="Email"
          type="email"
          required
          onChange={(e) => handleChange("email", e.target.value)}
        />

        <input
          placeholder="Password"
          type="password"
          required
          onChange={(e) => handleChange("password", e.target.value)}
        />

        <select
          value={form.role}
          onChange={(e) => handleChange("role", e.target.value)}
        >
          <option value="applicant">Applicant</option>
          <option value="recruiter">Recruiter</option>
        </select>

        {error && <p className="error">{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Register"}
        </button>
      </form>
    </div>
  );
}