import mongoose from "mongoose";

const InterviewSchema = new mongoose.Schema({
    applicationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Application",
        required: true,
    },
    round: {
        type: String,
        required: true,
        trim: true,
    },
    date: {
        type: Date,

    },
    outcome: {
        type: String,
        enum: [
            "Pending",
            "Passed",
            "Failed",
        ],
        default: "Pending",
    },
    notes: {
        type: String,
        trim: true,
    },
},{
    timestamps: true,
});


export const Interview = mongoose.models.Interview || mongoose.model("Interview", InterviewSchema)