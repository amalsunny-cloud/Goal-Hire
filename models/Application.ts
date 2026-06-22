import mongoose, { models, Schema, model } from "mongoose";

const ApplicationSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Applied", "Interview", "Offer", "Rejected"],
      default: "Applied",
    },
    appliedDate: {
      type: Date,
      default: Date.now,
    },
    notes: {
      type: String,
      default: "",
    },
    followUpDate: {
      type: Date,
    },
    jobUrl: {
      type: String,
    },
    location: {
      type: String,
    },
    salary: {
      type: String,
    },
    source: {
      type: String,
      enum: [
        "LinkedIn",
        "Indeed",
        "Naukri",
        "Company Website",
        "Referral",
        "Other",
      ],
      default: "Linkedin",
    },
  },
  { timestamps: true },
);

export const Application =
  models.Application || model("Application", ApplicationSchema);
