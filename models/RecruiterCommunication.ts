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
            "Linkedin",
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
        type: String
    },
    message: {
        type: String,
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
            "Rejected"
        ]
    },
    responseNotes: String
},{
    timestamps: true,
});


export const RecruiterCommunication = mongoose.models.RecruiterCommunication || mongoose.model("RecruiterCommunication",RecruiterCommunicationSchema)