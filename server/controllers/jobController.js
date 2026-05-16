const JobRequest = require("../models/JobRequest");


// GET ALL JOBS
const getJobs = async (req, res) => {
  try {

    const filter = {};

    // FILTER BY CATEGORY
    if (req.query.category) {
      filter.category = req.query.category;
    }

    // FILTER BY STATUS
    if (req.query.status) {
      filter.status = req.query.status;
    }

    const jobs = await JobRequest.find(filter).sort({
      createdAt: -1,
    });

    res.status(200).json(jobs);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};



// GET SINGLE JOB
const getJobById = async (req, res) => {
  try {

    const job = await JobRequest.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    res.status(200).json(job);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};



// CREATE JOB
const createJob = async (req, res) => {
  try {

    const {
      title,
      description,
      category,
      location,
      contactName,
      contactEmail,
    } = req.body;

    // BASIC VALIDATION
    if (
      !title ||
      !description ||
      !category ||
      !contactEmail
    ) {
      return res.status(400).json({
        message: "Please fill all required fields",
      });
    }

    const newJob = await JobRequest.create({
      title,
      description,
      category,
      location,
      contactName,
      contactEmail,
    });

    res.status(201).json(newJob);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};



// UPDATE JOB STATUS
const updateJobStatus = async (req, res) => {
  try {

    const { status } = req.body;

    const allowedStatus = [
      "Open",
      "In Progress",
      "Closed",
    ];

    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        message: "Invalid status value",
      });
    }

    const updatedJob = await JobRequest.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedJob) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    res.status(200).json(updatedJob);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};



// DELETE JOB
const deleteJob = async (req, res) => {
  try {

    const deletedJob = await JobRequest.findByIdAndDelete(
      req.params.id
    );

    if (!deletedJob) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    res.status(200).json({
      message: "Job deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};




module.exports = {
  getJobs,
  getJobById,
  createJob,
  updateJobStatus,
  deleteJob,
};