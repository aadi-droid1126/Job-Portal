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

/**
 * 🚀 FINAL SEARCH ENGINE
 * Supports:
 * ?keyword=
 * ?location=
 * ?company=
 * ?sort=latest|oldest|company
 * ?page=1
 * ?limit=10
 */
const getAllJobs = async (queryParams = {}) => {
  const {
    keyword,
    location,
    company,
    sort = "latest",
    page = 1,
    limit = 10,
  } = queryParams;

  let query = {};

  // 🔍 Keyword search
  if (keyword) {
    query.$or = [
      { title: { $regex: keyword, $options: "i" } },
      { company: { $regex: keyword, $options: "i" } },
      { location: { $regex: keyword, $options: "i" } },
    ];
  }

  // 📍 Filters
  if (location) {
    query.location = { $regex: location, $options: "i" };
  }

  if (company) {
    query.company = { $regex: company, $options: "i" };
  }

  // 📊 Sorting
  let sortOption = { createdAt: -1 }; // default latest
  if (sort === "oldest") sortOption = { createdAt: 1 };
  if (sort === "company") sortOption = { company: 1 };

  // 📄 Pagination
  const pageNum = Math.max(Number(page), 1);
  const limitNum = Math.max(Number(limit), 1);
  const skip = (pageNum - 1) * limitNum;

  const [jobs, total] = await Promise.all([
    Job.find(query)
      .populate("createdBy", "name email")
      .sort(sortOption)
      .skip(skip)
      .limit(limitNum),
    Job.countDocuments(query),
  ]);

  return {
    data: jobs,
    meta: {
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
    },
  };
};

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
