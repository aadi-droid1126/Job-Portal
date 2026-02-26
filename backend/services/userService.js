const mongoose = require("mongoose");
const User = require("../models/User");
const Job = require("../models/Job");

// ⭐ Toggle Save / Unsave Job
const toggleSaveJob = async (userId, jobId) => {
  if (!mongoose.Types.ObjectId.isValid(jobId)) {
    return { error: "Invalid job id.", status: 400 };
  }

  const user = await User.findById(userId);
  if (!user) {
    return { error: "User not found.", status: 404 };
  }

  const jobExists = await Job.exists({ _id: jobId });
  if (!jobExists) {
    return { error: "Job not found.", status: 404 };
  }

  const alreadySaved = user.savedJobs.includes(jobId);

  if (alreadySaved) {
    // 🔴 Remove bookmark
    user.savedJobs = user.savedJobs.filter((id) => id.toString() !== jobId);
  } else {
    // 🟢 Add bookmark
    user.savedJobs.push(jobId);
  }

  await user.save();

  return {
    data: {
      saved: !alreadySaved,
      message: alreadySaved ? "Job removed from saved." : "Job saved.",
    },
    status: 200,
  };
};

// ⭐ Get All Saved Jobs
const getSavedJobs = async (userId) => {
  const user = await User.findById(userId).populate({
    path: "savedJobs",
    populate: { path: "createdBy", select: "name email" },
  });

  if (!user) {
    return { error: "User not found.", status: 404 };
  }

  return {
    data: user.savedJobs,
    status: 200,
  };
};

module.exports = {
  toggleSaveJob,
  getSavedJobs,
};
