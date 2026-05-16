"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import API from "./../../services/api";

export default function JobDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  // GET SINGLE JOB
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await API.get(`/jobs/${id}`);
        setJob(res.data); // ✅ correct (your backend returns object directly)
      } catch (err) {
        console.log("Fetch error:", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchJob();
  }, [id]);

  // UPDATE STATUS
  const handleStatusChange = async (e) => {
    try {
      const res = await API.patch(`/jobs/${id}`, {
        status: e.target.value,
      });

      setJob(res.data); // ✅ backend returns updatedJob
    } catch (err) {
      console.log("Update error:", err.response?.data || err.message);
    }
  };

  // DELETE JOB
  const handleDelete = async () => {
    if (!confirm("Are you sure?")) return;

    try {
      await API.delete(`/jobs/${id}`); // backend returns message only
      router.push("/");
    } catch (err) {
      console.log("Delete error:", err.response?.data || err.message);
    }
  };

  if (loading) return <div className="p-5">Loading...</div>;
  if (!job) return <div className="p-5">Job not found</div>;

  return (
    <div className="container py-5">
      <div className="card shadow-sm">
        <div className="card-body">

          <h2>{job.title}</h2>

          <p className="text-muted">
            {job.category} • {job.location}
          </p>

          <hr />

          <p>{job.description}</p>

          <p><b>Name:</b> {job.contactName}</p>
          <p><b>Email:</b> {job.contactEmail}</p>

          {/* STATUS */}
          <div className="mb-3">
            <label className="form-label fw-bold">Status</label>

            <select
              className="form-select"
              value={job.status}
              onChange={handleStatusChange}
            >
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Closed">Closed</option>
            </select>
          </div>

          {/* ACTIONS */}
          <button className="btn btn-danger" onClick={handleDelete}>
            Delete Job
          </button>

          <button
            className="btn btn-secondary ms-2"
            onClick={() => router.push("/")}
          >
            Back
          </button>

        </div>
      </div>
    </div>
  );
}