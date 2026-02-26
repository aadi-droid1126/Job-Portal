const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const allowRoles = require("../middleware/roleMiddleware");
const ROLES = require("../constants/roles");

const {
  applyToJob,
  getMyApplications,
  getApplicationsForJob,
} = require("../controllers/applicationController");

// ================= APPLICANT ROUTES =================

// Apply to a job
router.post("/:jobId", protect, allowRoles(ROLES.APPLICANT), applyToJob);

// ✅ My applications (supports both /me and /mine)
router.get("/me", protect, allowRoles(ROLES.APPLICANT), getMyApplications);
router.get("/mine", protect, allowRoles(ROLES.APPLICANT), getMyApplications);

// ================= RECRUITER ROUTES =================

// Get all applications for recruiter's jobs
router.get(
  "/recruiter",
  protect,
  allowRoles(ROLES.RECRUITER),
  async (req, res) => {
    const Application = require("../models/Application");
    const Job = require("../models/Job");

    try {
      const jobs = await Job.find({ createdBy: req.user.id }).select("_id");
      const jobIds = jobs.map((j) => j._id);

      const apps = await Application.find({ job: { $in: jobIds } })
        .populate("job")
        .populate("applicant", "name email");

      res.json(apps);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to fetch recruiter apps" });
    }
  },
);

// Existing route (still supported)
router.get(
  "/job/:jobId",
  protect,
  allowRoles(ROLES.RECRUITER),
  getApplicationsForJob,
);

module.exports = router;
