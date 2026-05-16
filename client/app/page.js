"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import API from "./services/api";

export default function HomePage() {
  const router = useRouter();

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [category, setCategory] = useState("");

  // FETCH JOBS
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);

        const params = {};
        if (search) params.search = search;
        if (status) params.status = status;
        if (category) params.category = category;

        const res = await API.get("/jobs", { params });
        setJobs(res.data);
      } catch (err) {
        console.log("Error fetching jobs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [search, status, category]);

  return (
    <div className="container py-4">

      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>
          <h2 className="fw-bold">Service Requests</h2>
          <p className="text-muted mb-0">
            Manage all maintenance requests
          </p>
        </div>

        {/* AUTH + ACTION BUTTONS */}
        <div className="d-flex gap-2">

          <button
            className="btn btn-outline-primary"
            onClick={() => router.push("/login")}
          >
            Login
          </button>

          <button
            className="btn btn-primary"
            onClick={() => router.push("/register")}
          >
            Register
          </button>

          <button
            className="btn btn-success"
            onClick={() => router.push("/jobs/new")}
          >
            + New Request
          </button>

        </div>

      </div>

      {/* FILTERS */}
      <div className="row g-2 mb-4">

        <div className="col-md-4">
          <input
            className="form-control"
            placeholder="Search jobs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="col-md-4">
          <select
            className="form-select"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Closed">Closed</option>
          </select>
        </div>

        <div className="col-md-4">
          <select
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="Plumbing">Plumbing</option>
            <option value="Electrical">Electrical</option>
            <option value="Painting">Painting</option>
            <option value="Joinery">Joinery</option>
          </select>
        </div>

      </div>

      {/* CONTENT */}
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" />
        </div>
      ) : jobs.length === 0 ? (
        <div className="alert alert-warning text-center">
          No jobs found
        </div>
      ) : (
        <div className="row g-3">

          {jobs.map((job) => (
            <div key={job._id} className="col-md-4">

              <div
                className="card shadow-sm h-100"
                style={{ cursor: "pointer" }}
                onClick={() => router.push(`/jobs/${job._id}`)}
              >

                <div className="card-body">

                  <span
                    className={`badge mb-2 ${
                      job.status === "Open"
                        ? "bg-primary"
                        : job.status === "In Progress"
                        ? "bg-warning text-dark"
                        : "bg-success"
                    }`}
                  >
                    {job.status}
                  </span>

                  <h5 className="card-title">
                    {job.title}
                  </h5>

                  <p className="card-text text-muted">
                    {job.description?.slice(0, 80)}...
                  </p>

                  <small className="text-muted">
                    📍 {job.location}
                  </small>

                  <br />

                  <small className="text-muted">
                    🏷 {job.category}
                  </small>

                  <br />

                  <small className="text-muted">
                    🕒 {new Date(job.createdAt).toLocaleDateString()}
                  </small>

                </div>

              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}