import mongoose from "mongoose";

const GoalSchema = new mongoose.Schema({
    userId: {
        type: String,
        required :true,
    },
    applicationGoal: {
        type: Number,
        default: 30,
    },
    interviewGoal: {
        type: Number,
        default: 8,
    },
    offerGoal: {
        type: Number,
        default: 2,
    },
    },{
        timestamps: true,
    }
);

export const Goal = mongoose.models.Goal || mongoose.model("Goal", GoalSchema)