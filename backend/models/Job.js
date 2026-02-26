const mongoose = require("mongoose");
const Application = require("./Application");

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    company: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

// ================= CASCADE DELETE APPLICATIONS =================

// If job deleted via document.deleteOne()
jobSchema.pre("deleteOne", { document: true }, async function () {
  await Application.deleteMany({ job: this._id });
});

// If job deleted via findByIdAndDelete / findOneAndDelete
jobSchema.pre("findOneAndDelete", async function () {
  const job = await this.model.findOne(this.getFilter());
  if (job) {
    await Application.deleteMany({ job: job._id });
  }
});

module.exports = mongoose.models.Job || mongoose.model("Job", jobSchema);
