import mongoose from "mongoose";

const ResumeAnalysisSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    resumeText: {
      type: String,
      required: true,
      trim: true,
    },

    analysis: {
      professionalSummary: {
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

      experience: {
        type: [String],
        default: [],
      },

      education: {
        type: [String],
        default: [],
      },

      projects: {
        type: [String],
        default: [],
      },

      certifications: {
        type: [String],
        default: [],
      },

      keywords: {
        type: [String],
        default: [],
      },

      strengths: {
        type: [String],
        default: [],
      },

      weaknesses: {
        type: [String],
        default: [],
      },

      careerPositioning: {
        type: [String],
        default: [],
      },

      technicalSkillGaps: {
        type: [String],
        default: [],
      },

      projectImprovementSuggestions: {
        type: [String],
        default: [],
      },

      experienceImprovementSuggestions: {
        type: [String],
        default: [],
      },

      improvementSuggestions: {
        type: [String],
        default: [],
      },

      overallSummary: {
        type: String,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  },
);

export const ResumeAnalysis =
  mongoose.models.ResumeAnalysis ||
  mongoose.model("ResumeAnalysis", ResumeAnalysisSchema);