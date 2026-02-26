const router = require("express").Router();

const protect = require("../middleware/authMiddleware");
const checkRole = require("../middleware/roleMiddleware");

const {
  createJob,
  getAllJobs,
  getJobById,
  deleteJob,
} = require("../controllers/jobController");

// ---------------- PUBLIC ROUTES ----------------

// Get all jobs
router.get("/", getAllJobs);

// Get single job
router.get("/:id", getJobById);

// ---------------- RECRUITER ROUTES ----------------

// Create job (Recruiter only)
router.post("/", protect, checkRole("recruiter"), createJob);

// Delete job (Recruiter only)
router.delete("/:id", protect, checkRole("recruiter"), deleteJob);

module.exports = router;
