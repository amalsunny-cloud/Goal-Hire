import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true,
    },

    phone: {
      type: String,
      trim: true,
    },

    location: {
      type: String,
      trim: true,
    },

    professionalTitle: {
      type: String,
      trim: true,
    },

    bio: {
      type: String,
      trim: true,
      maxlength: 1000,
    },

    skills: {
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

    resumeUrl: {
      type: String,
      trim: true,
    },

    portfolioUrl: {
      type: String,
      trim: true,
    },

    githubUrl: {
      type: String,
      trim: true,
    },

    linkedinUrl: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Profile =
  mongoose.models.Profile || mongoose.model("Profile", ProfileSchema);