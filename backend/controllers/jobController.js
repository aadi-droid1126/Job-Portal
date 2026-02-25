const {
  createJob,
  getAllJobs,
  getJobById,
  getRecruiterJobs,
} = require("../services/jobService");

exports.createJob = async (req, res, next) => {
  try {
    const result = await createJob(req.body, req.user._id);

    if (result.error) {
      return res.status(result.status).json({ message: result.error });
    }

    return res.status(result.status).json(result.data);
  } catch (error) {
    return next(error);
  }
};

exports.getJobs = async (req, res, next) => {
  try {
    const jobs = await getAllJobs();
    return res.json(jobs);
  } catch (error) {
    return next(error);
  }
};

exports.getJobById = async (req, res, next) => {
  try {
    const result = await getJobById(req.params.id);

    if (result.error) {
      return res.status(result.status).json({ message: result.error });
    }

    return res.json(result.data);
  } catch (error) {
    return next(error);
  }
};

exports.getRecruiterJobs = async (req, res, next) => {
  try {
    const jobs = await getRecruiterJobs(req.user._id);
    return res.json(jobs);
  } catch (error) {
    return next(error);
  }
};
