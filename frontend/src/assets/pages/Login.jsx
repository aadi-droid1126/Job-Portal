import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast"; // ⭐ NEW

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
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
      const { data } = await api.post("/auth/login", form);

      const token = data.token || data?.data?.token;
      const role = data.user?.role || data.role;

      if (!token) throw new Error("Invalid server response");

      login({ token, role });

      // ⭐ Success toast
      toast.success("Welcome back 🎉");

      navigate("/");
    } catch (err) {
      console.error(err);

      const message =
        err.response?.data?.message || err.message || "Login failed";

      setError(message);

      // ⭐ Error toast
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card form">
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
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

        {error && <p className="error">{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Signing in..." : "Login"}
        </button>
      </form>
    </div>
  );
}