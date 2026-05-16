"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import API from "../services/api";

export default function JobsPage() {
  const router = useRouter();

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await API.get("/jobs");
        setJobs(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return (
      <div className="container py-5">
        <h3>Loading...</h3>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h2 className="mb-4">All Jobs</h2>

      <div className="row">
        {jobs.map((job) => (
          <div key={job._id} className="col-md-4 mb-3">
            <div
              className="card h-100 shadow-sm"
              style={{ cursor: "pointer" }}
              onClick={() => router.push(`/jobs/${job._id}`)}
            >
              <div className="card-body">
                <h5>{job.title}</h5>

                <p>{job.description}</p>

                <span className="badge bg-primary">
                  {job.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
