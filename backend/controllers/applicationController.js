const {
  applyToJob,
  getApplicantApplications,
  getRecruiterApplications,
} = require("../services/applicationService");

exports.applyToJob = async (req, res, next) => {
  try {
    const result = await applyToJob({
      jobId: req.params.jobId,
      applicantId: req.user._id,
      coverLetter: req.body.coverLetter,
    });

    if (result.error) {
      return res.status(result.status).json({ message: result.error });
    }

    return res.status(result.status).json(result.data);
  } catch (error) {
    return next(error);
  }
};

exports.getApplicantApplications = async (req, res, next) => {
  try {
    const applications = await getApplicantApplications(req.user._id);
    return res.json(applications);
  } catch (error) {
    return next(error);
  }
};

exports.getRecruiterApplications = async (req, res, next) => {
  try {
    const applications = await getRecruiterApplications(req.user._id);
    return res.json(applications);
  } catch (error) {
    return next(error);
  }
};
