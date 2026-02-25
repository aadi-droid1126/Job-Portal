const mongoose = require("mongoose");
const Job = require("../models/Job");
const { validateJobPayload } = require("../utils/validators");

const createJob = async (payload, recruiterId) => {
  const error = validateJobPayload(payload);
  if (error) {
    return { error, status: 400 };
  }

  const job = await Job.create({
    ...payload,
    createdBy: recruiterId,
  });

  return { data: job, status: 201 };
};

const getAllJobs = async () =>
  Job.find().populate("createdBy", "name email").sort({ createdAt: -1 });

const getJobById = async (jobId) => {
  if (!mongoose.Types.ObjectId.isValid(jobId)) {
    return { error: "Invalid job id.", status: 400 };
  }

  const job = await Job.findById(jobId).populate("createdBy", "name email");

  if (!job) {
    return { error: "Job not found.", status: 404 };
  }

  return { data: job, status: 200 };
};

const getRecruiterJobs = async (recruiterId) =>
  Job.find({ createdBy: recruiterId }).sort({ createdAt: -1 });

module.exports = {
  createJob,
  getAllJobs,
  getJobById,
  getRecruiterJobs,
};
