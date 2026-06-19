import mongoose from "mongoose";

const Attachmentschema = new mongoose.Schema({
    applicationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Application",
        required: true,
    },
    filename: {
        type: String,
        required: true,
    },
    fileUrl: {
        type: String,
        required: true,
    },
},
{
    timestamps: true,
});

export const Attachment = mongoose.models.Attachment || mongoose.model("Attachement",Attachmentschema)