import mongoose, { mongo } from "mongoose";

const RecruiterSchema = new mongoose.Schema({
    applicationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Application",
        required: true,
    },
    name:{
        type: String,
    },
    email: {
        type: String,
    },
    phone:{
        type: String,
    },
    linkedin: {
        type: String,
    },
    lastContact: {
        type: Date,
    },
    nextFollowUp: {
        type: Date,
    },
    notes: {
        type: String,
    }
},{
    timestamps: true,
})

export const Recruiter = mongoose.models.Recruiter || mongoose.model("Recruiter",RecruiterSchema);