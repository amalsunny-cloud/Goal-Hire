import mongoose from "mongoose";

const RecruiterCommunicationSchema = new mongoose.Schema({
    recruiterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Recruiter",
        required:true,
    },
    applicationId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Application",
        required: true,
    },
    type:{
        type:String,
        enum:[
            "Email",
            "Phone",
            "LinkedIn",
            "WhatsApp",
            "Meeting",
            "Other"
        ],
        required: true,
    },
    date:{
        type: Date,
        required: true,
    },
    subject: {
        type: String,
        trim: true,
    },
    message: {
        type: String,
        trim: true,
    },
    responded: {
        type: Boolean,
        default: false
    },
    responseDate: Date,
    responseType: {
        type: String,
        enum: [
            "Positive",
            "Negative",
            "Rejected",
            "No Response",
        ]
    },
    responseNotes: String,
},{
    timestamps: true,
});


export const RecruiterCommunication = mongoose.models.RecruiterCommunication || mongoose.model("RecruiterCommunication",RecruiterCommunicationSchema)