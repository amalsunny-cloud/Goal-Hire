import mongoose from "mongoose";

const RecruiterSchema = new mongoose.Schema({
    applicationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Application",
        required: true,
    },
    name:{
        type: String,
        trim:true,
    },
    email: {
        type: String,
        trim:true,
        lowercase: true,
        match:[
           /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please enter a valid email address",
        ],
    },
    phone:{
        type: String,
        trim:true,
    },
    linkedin: {
        type: String,
        trim:true,
    },
    lastContact: {
        type: Date,
    },
    nextFollowUp: {
        type: Date,
    },
    notes: {
        type: String,
        trim:true,
    },
    tags: [
        {
            type: String,
        }
    ]
},{
    timestamps: true,
})

export const Recruiter = mongoose.models.Recruiter || mongoose.model("Recruiter",RecruiterSchema);