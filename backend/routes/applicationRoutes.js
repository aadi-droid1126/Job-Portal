const express = require("express");
const {
  applyToJob,
  getApplicantApplications,
  getRecruiterApplications,
} = require("../controllers/applicationController");
const { protect } = require("../middleware/authMiddleware");
const { allowRoles } = require("../middleware/roleMiddleware");
const ROLES = require("../constants/roles");

const router = express.Router();

router.post("/:jobId", protect, allowRoles(ROLES.APPLICANT), applyToJob);
router.get(
  "/mine",
  protect,
  allowRoles(ROLES.APPLICANT),
  getApplicantApplications,
);
router.get(
  "/recruiter",
  protect,
  allowRoles(ROLES.RECRUITER),
  getRecruiterApplications,
);

module.exports = router;
