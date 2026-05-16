const express = require("express");
const router = express.Router();

const {
  getJobs,
  getJobById,
  createJob,
  updateJobStatus,
  deleteJob
} = require("../controllers/jobController");
const protect = require("../middleware/authMiddleware");
router.get("/jobs", getJobs);
router.get("/jobs/:id", getJobById);
router.post("/jobs", protect, createJob);

router.patch("/jobs/:id", protect, updateJobStatus);
router.delete("/jobs/:id", protect, deleteJob);


module.exports = router;