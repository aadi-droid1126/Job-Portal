const router = require("express").Router();
const protect = require("../middleware/authMiddleware");

const {
  getMe,
  updateProfile,
  deleteMyAccount,
  getAllUsers,
  getUserById,

  // ⭐ SHORTLIST
  addToShortlist,
  removeFromShortlist,
  getShortlist,
  updateShortlistNote, // ✅ NEW
} = require("../controllers/userController");

// ================= CURRENT USER =================
router.get("/me", protect, getMe);
router.put("/me", protect, updateProfile);
router.delete("/me", protect, deleteMyAccount);

// ================= SHORTLIST =================
router.get("/shortlist", protect, getShortlist);
router.post("/shortlist/:id", protect, addToShortlist);
router.delete("/shortlist/:id", protect, removeFromShortlist);
router.put("/shortlist/:id", protect, updateShortlistNote); // ✅ NEW

// ================= PUBLIC PROFILE =================
router.get("/:id", protect, getUserById);

// ================= ALL USERS =================
router.get("/", protect, getAllUsers);

module.exports = router;
