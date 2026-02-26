const jobService = require("../services/jobService");

// @desc   Create Job
// @route  POST /api/jobs
// @access Recruiter
exports.createJob = async (req, res, next) => {
  try {
    const result = await jobService.createJob(req.body, req.user._id);

    if (result.error) {
      return res.status(result.status).json({ message: result.error });
    }

    res.status(result.status).json(result.data);
  } catch (err) {
    next(err);
  }
};

// @desc   Get All Jobs (SEARCH ENGINE)
// @route  GET /api/jobs
// @access Public
exports.getAllJobs = async (req, res, next) => {
  try {
    const result = await jobService.getAllJobs(req.query);

    res.json(result); // returns { data, meta }
  } catch (err) {
    next(err);
  }
};

// @desc   Get Job By ID
// @route  GET /api/jobs/:id
// @access Public
exports.getJobById = async (req, res, next) => {
  try {
    const result = await jobService.getJobById(req.params.id);

    if (result.error) {
      return res.status(result.status).json({ message: result.error });
    }

    res.json(result.data);
  } catch (err) {
    next(err);
  }
};

// @desc   Delete Job
// @route  DELETE /api/jobs/:id
// @access Recruiter (Owner only)
exports.deleteJob = async (req, res, next) => {
  try {
    const result = await jobService.getJobById(req.params.id);

    if (result.error) {
      return res.status(result.status).json({ message: result.error });
    }

    const job = result.data;

    if (job.createdBy._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await job.deleteOne();

    res.json({ message: "Job deleted successfully" });
  } catch (err) {
    next(err);
  }
};
