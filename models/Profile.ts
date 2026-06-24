import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    resumeUrl: {
        type: String,
    },
    portfolioUrl: {
        type: String,
    },
    githubUrl: {
        type: String,
    },
    linkedinUrl: {
        type: String,
    },
    skills: {
        type: String,
    }
},{
    timestamps: true,
})

export const Profile = mongoose.models.Profile || mongoose.model("Profile", ProfileSchema);