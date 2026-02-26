const User = require("../models/User");
const Job = require("../models/Job");
const Application = require("../models/Application");
const bcrypt = require("bcryptjs");
const userService = require("../services/userService");

// ================= GET CURRENT USER =================
// GET /api/users/me
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Failed to fetch user",
    });
  }
};

// ================= UPDATE PROFILE =================
// PUT /api/users/me
exports.updateProfile = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      bio,
      skills,
      location,
      avatarUrl,
      resumeUrl,
      github,
      linkedin,
    } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // ===== BASIC FIELDS =====
    if (name) user.name = name;
    if (email) user.email = email;

    // ===== PROFILE FIELDS =====
    if (bio !== undefined) user.bio = bio;
    if (skills !== undefined) user.skills = skills;
    if (location !== undefined) user.location = location;
    if (avatarUrl !== undefined) user.avatarUrl = avatarUrl;
    if (resumeUrl !== undefined) user.resumeUrl = resumeUrl;
    if (github !== undefined) user.github = github;
    if (linkedin !== undefined) user.linkedin = linkedin;

    // ===== PASSWORD =====
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save();

    res.json({
      message: "Profile updated",
      user: user.toObject({
        getters: true,
        versionKey: false,
        transform: (_, ret) => {
          delete ret.password;
          return ret;
        },
      }),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Failed to update profile",
    });
  }
};

// ================= DELETE ACCOUNT =================
// DELETE /api/users/me
exports.deleteMyAccount = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (user.role === "recruiter") {
      await Job.deleteMany({ createdBy: userId });
    }

    if (user.role === "applicant") {
      await Application.deleteMany({ user: userId });
    }

    const recruiterJobs = await Job.find({ createdBy: userId }).select("_id");
    const jobIds = recruiterJobs.map((j) => j._id);

    if (jobIds.length) {
      await Application.deleteMany({ job: { $in: jobIds } });
    }

    await User.findByIdAndDelete(userId);

    res.json({
      message: "Account and related data deleted successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Failed to delete account",
    });
  }
};

// ================= GET ALL USERS =================
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Failed to fetch users",
    });
  }
};

// ================= GET USER BY ID =================
// GET /api/users/:id
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Failed to fetch user profile",
    });
  }
};

// ================= ADD TO SHORTLIST =================
// POST /api/users/shortlist/:id
exports.addToShortlist = async (req, res) => {
  try {
    const recruiter = await User.findById(req.user.id);

    if (recruiter.role !== "recruiter") {
      return res.status(403).json({ message: "Only recruiters allowed" });
    }

    const candidateId = req.params.id;

    if (!recruiter.shortlistedCandidates.includes(candidateId)) {
      recruiter.shortlistedCandidates.push(candidateId);
      await recruiter.save();
    }

    res.json({ message: "Candidate shortlisted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to shortlist candidate" });
  }
};

// ================= REMOVE FROM SHORTLIST =================
// DELETE /api/users/shortlist/:id
exports.removeFromShortlist = async (req, res) => {
  try {
    const recruiter = await User.findById(req.user.id);

    recruiter.shortlistedCandidates = recruiter.shortlistedCandidates.filter(
      (id) => id.toString() !== req.params.id,
    );

    await recruiter.save();

    res.json({ message: "Removed from shortlist" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to remove candidate" });
  }
};

// ================= GET SHORTLIST =================
// GET /api/users/shortlist
exports.getShortlist = async (req, res) => {
  try {
    const recruiter = await User.findById(req.user.id).populate(
      "shortlistedCandidates",
      "-password",
    );

    res.json(recruiter.shortlistedCandidates);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch shortlist" });
  }
};
// ================= ADD TO SHORTLIST =================
// POST /api/users/shortlist/:id
exports.addToShortlist = async (req, res) => {
  try {
    const recruiter = await User.findById(req.user.id);

    if (recruiter.role !== "recruiter") {
      return res.status(403).json({ message: "Only recruiters allowed" });
    }

    const candidateId = req.params.id;

    const alreadyExists = recruiter.shortlistedCandidates.find(
      (c) => c.user.toString() === candidateId,
    );

    if (!alreadyExists) {
      recruiter.shortlistedCandidates.push({ user: candidateId, note: "" });
      await recruiter.save();
    }

    res.json({ message: "Candidate shortlisted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to shortlist candidate" });
  }
};

// ================= REMOVE FROM SHORTLIST =================
// DELETE /api/users/shortlist/:id
exports.removeFromShortlist = async (req, res) => {
  try {
    const recruiter = await User.findById(req.user.id);

    recruiter.shortlistedCandidates = recruiter.shortlistedCandidates.filter(
      (c) => c.user.toString() !== req.params.id,
    );

    await recruiter.save();

    res.json({ message: "Removed from shortlist" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to remove candidate" });
  }
};

// ================= UPDATE NOTE =================
// PUT /api/users/shortlist/:id
exports.updateShortlistNote = async (req, res) => {
  try {
    const recruiter = await User.findById(req.user.id);
    const { note } = req.body;

    const entry = recruiter.shortlistedCandidates.find(
      (c) => c.user.toString() === req.params.id,
    );

    if (!entry) {
      return res.status(404).json({ message: "Candidate not shortlisted" });
    }

    entry.note = note || "";
    await recruiter.save();

    res.json({ message: "Note updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update note" });
  }
};

// ================= GET SHORTLIST =================
// GET /api/users/shortlist
exports.getShortlist = async (req, res) => {
  try {
    const recruiter = await User.findById(req.user.id).populate(
      "shortlistedCandidates.user",
      "-password",
    );

    res.json(recruiter.shortlistedCandidates);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch shortlist" });
  }
};

// ================= TOGGLE SAVE JOB =================
// POST /api/users/save/:jobId
exports.toggleSaveJob = async (req, res) => {
  try {
    const result = await userService.toggleSaveJob(
      req.user.id,
      req.params.jobId,
    );

    if (result.error) {
      return res.status(result.status).json({ message: result.error });
    }

    res.json(result.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to toggle saved job" });
  }
};

// ================= GET SAVED JOBS =================
// GET /api/users/saved
exports.getSavedJobs = async (req, res) => {
  try {
    const result = await userService.getSavedJobs(req.user.id);

    if (result.error) {
      return res.status(result.status).json({ message: result.error });
    }

    res.json(result.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch saved jobs" });
  }
};
