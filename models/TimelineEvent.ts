import mongoose from "mongoose";


const TimelineEventSchema = new mongoose.Schema(
    {
        applicationId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Application",
            required: true
        },

        type: {
            type: String,
            required: true
        },
        message: {
            type: String,
            required: true
        },
    },{
        timestamps: true
    }
);

export const TimelineEvent = mongoose.models.TimelineEvent || mongoose.model("TimelineEvent", TimelineEventSchema)