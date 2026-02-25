const mongoose = require("mongoose");
const Application = require("../models/Application");
const Job = require("../models/Job");

const applyToJob = async ({ jobId, applicantId, coverLetter = "" }) => {
  if (!mongoose.Types.ObjectId.isValid(jobId)) {
    return { error: "Invalid job id.", status: 400 };
  }

  const job = await Job.findById(jobId);
  if (!job) {
    return { error: "Job not found.", status: 404 };
  }

  try {
    const application = await Application.create({
      job: jobId,
      applicant: applicantId,
      coverLetter,
    });

    return { data: application, status: 201 };
  } catch (error) {
    if (error.code === 11000) {
      return { error: "You already applied to this job.", status: 400 };
    }

    throw error;
  }
};

const getApplicantApplications = async (applicantId) =>
  Application.find({ applicant: applicantId })
    .populate("job")
    .sort({ createdAt: -1 });

const getRecruiterApplications = async (recruiterId) => {
  const applications = await Application.find()
    .populate({
      path: "job",
      match: { createdBy: recruiterId },
    })
    .populate("applicant", "name email")
    .sort({ createdAt: -1 });

  return applications.filter((application) => application.job);
};

module.exports = {
  applyToJob,
  getApplicantApplications,
  getRecruiterApplications,
};
