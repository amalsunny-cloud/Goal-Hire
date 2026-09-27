import mongoose from "mongoose";

const JobAnalysisSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    jobDescription: {
      type: String,
      required: true,
      trim: true,
    },

    analysis: {
      jobTitle: {
        type: String,
        required: true,
      },

      company: {
        type: String,
        required: true,
      },

      seniority: {
        type: String,
        required: true,
      },

      experience: {
        type: String,
        required: true,
      },

      technicalSkills: {
        type: [String],
        default: [],
      },

      softSkills: {
        type: [String],
        default: [],
      },

      mustHaveSkills: {
        type: [String],
        default: [],
      },

      niceToHaveSkills: {
        type: [String],
        default: [],
      },

      education: {
        type: [String],
        default: [],
      },

      responsibilities: {
        type: [String],
        default: [],
      },

      qualifications: {
        type: [String],
        default: [],
      },

      keywords: {
        type: [String],
        default: [],
      },

      summary: {
        type: String,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  },
);

export const JobAnalysis =
  mongoose.models.JobAnalysis ||
  mongoose.model("JobAnalysis", JobAnalysisSchema);