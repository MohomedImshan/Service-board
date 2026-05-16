"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import API from "../services/api";

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await API.post("/auth/login", form);

      // Save JWT token
      localStorage.setItem("token", res.data.token);

      // optional: save user info
      localStorage.setItem("user", JSON.stringify(res.data.user));

      router.push("/");
    } catch (err) {
      setError(
        err?.response?.data?.message || "Invalid credentials"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5 d-flex justify-content-center">
      <div className="card shadow-sm p-4" style={{ width: "400px" }}>

        <h3 className="mb-3 text-center">Login</h3>

        {error && (
          <div className="alert alert-danger">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="d-grid gap-3">

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="form-control"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="form-control"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        <p className="text-center mt-3 mb-0">
          Don't have an account?{" "}
          <span
            className="text-primary"
            style={{ cursor: "pointer" }}
            onClick={() => router.push("/register")}
          >
            Register
          </span>
        </p>

      </div>
    </div>
  );
}