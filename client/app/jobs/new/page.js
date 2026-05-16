"use client";

import { useState } from "react";
import API from "./../../services/api";
import { useRouter } from "next/navigation";

export default function NewJob() {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "Plumbing",
    location: "",
    contactName: "",
    contactEmail: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await API.post("/jobs", form);
      router.push("/");
    } catch (err) {
      console.error(err);
      setError("Failed to create service request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5" style={{ maxWidth: "600px" }}>
      <h1 className="h3 fw-bold mb-4">
        Create Service Request
      </h1>

      {/* Bootstrap Danger Alert */}
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            name="title"
            value={form.title}
            placeholder="Title"
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <textarea
            name="description"
            value={form.description}
            placeholder="Description"
            className="form-control"
            rows="3"
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <select
            name="category"
            value={form.category}
            className="form-select"
            onChange={handleChange}
          >
            <option value="Plumbing">Plumbing</option>
            <option value="Electrical">Electrical</option>
            <option value="Painting">Painting</option>
            <option value="Joinery">Joinery</option>
          </select>
        </div>

        <div className="mb-3">
          <input
            type="text"
            name="location"
            value={form.location}
            placeholder="Location"
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <input
            type="text"
            name="contactName"
            value={form.contactName}
            placeholder="Contact Name"
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <input
            type="email"
            name="contactEmail"
            value={form.contactEmail}
            placeholder="Contact Email"
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary px-4 d-flex align-items-center gap-2"
        >
          {loading && (
            <span 
              className="spinner-border spinner-border-sm" 
              role="status" 
              aria-hidden="true"
            ></span>
          )}
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}