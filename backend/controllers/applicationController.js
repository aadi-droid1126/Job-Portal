const Application = require("../models/Application");
const Job = require("../models/Job");

// Apply to job
exports.applyToJob = async (req, res) => {
  try {
    const jobId = req.params.jobId;

    // 🔒 CHECK DUPLICATE APPLICATION
    const existing = await Application.findOne({
      job: jobId,
      applicant: req.user.id,
    });

    if (existing) {
      return res.status(400).json({
        message: "You already applied to this job",
      });
    }

    const application = await Application.create({
      job: jobId,
      applicant: req.user.id,
    });

    res.status(201).json(application);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to apply" });
  }
};

// My applications
exports.getMyApplications = async (req, res) => {
  const apps = await Application.find({ applicant: req.user.id }).populate(
    "job",
  );

  res.json(apps);
};

// Recruiter view applicants
exports.getApplicationsForJob = async (req, res) => {
  const job = await Job.findById(req.params.jobId);

  if (!job) return res.status(404).json({ message: "Job not found" });

  if (job.createdBy.toString() !== req.user.id)
    return res.status(403).json({ message: "Not allowed" });

  const apps = await Application.find({ job: job._id }).populate(
    "applicant",
    "name email",
  );

  res.json(apps);
};
