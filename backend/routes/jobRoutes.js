const express = require("express");
const {
  createJob,
  getJobById,
  getJobs,
  getRecruiterJobs,
} = require("../controllers/jobController");
const { protect } = require("../middleware/authMiddleware");
const { allowRoles } = require("../middleware/roleMiddleware");
const ROLES = require("../constants/roles");

const router = express.Router();

router.get("/", getJobs);
router.get("/mine", protect, allowRoles(ROLES.RECRUITER), getRecruiterJobs);
router.get("/:id", getJobById);
router.post("/", protect, allowRoles(ROLES.RECRUITER), createJob);

module.exports = router;
