import ApplicationNotes from "@/components/application/ApplicationNotes";
import ApplicationTimeline from "@/components/application/ApplicationTimeline";
import AttachmentList from "@/components/application/AttachmentList";
import FileUpload from "@/components/application/FileUpload";
import InterviewForm from "@/components/forms/InterviewForm";
import InterviewList from "@/components/InterviewList";
import RecruiterSection from "@/components/recruiter/RecruiterSection";
import { connectDB } from "@/lib/db";
import { getApplication } from "@/lib/getApplication";
import { getInterviews } from "@/lib/getInterviews";
import { getUser } from "@/lib/getUser";
import Link from "next/link";
import {
  ArrowLeft,
  Building2,
  Briefcase,
  MapPin,
  DollarSign,
  Calendar,
  Clock,
  ExternalLink,
  Edit3,
} from "lucide-react";

interface ApplicationDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default async function ApplicationDetailsPage({
  params,
}: ApplicationDetailsPageProps) {
  await connectDB();

  const user = await getUser();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-slate-800">
        <div className="text-center space-y-3">
          <p className="text-lg font-medium text-slate-700">Unauthorized</p>
          <Link
            href="/auth/login"
            className="inline-block px-4 py-2 bg-slate-800 text-white text-sm font-medium rounded-xl shadow hover:bg-slate-900 transition-all"
          >
            Please Log In
          </Link>
        </div>
      </div>
    );
  }

  const { id } = await params;
  const application = await getApplication(id, user.userId);

  if (!application) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-slate-800">
        <div className="text-center space-y-3">
          <p className="text-lg font-medium text-slate-700">
            Application not found
          </p>
          <Link
            href="/dashboard"
            className="inline-block px-4 py-2 bg-slate-800 text-white text-sm font-medium rounded-xl shadow hover:bg-slate-900 transition-all"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const [rawInterviews] = await Promise.all([
    getInterviews(application._id.toString()),
  ]);

  const interviews = rawInterviews.map((interview) => ({
    _id: interview._id.toString(),
    applicationId: interview.applicationId.toString(),
    round: interview.round,
    date: interview.date ? new Date(interview.date).toISOString() : undefined,
    outcome: interview.outcome as "Pending" | "Passed" | "Failed",
    notes: interview.notes || "",
    createdAt: new Date(interview.createdAt).toISOString(),
    updatedAt: new Date(interview.updatedAt).toISOString(),
  }));

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Offer":
        return "bg-emerald-50 text-emerald-700 border-emerald-200 ring-emerald-500/10";
      case "Interview":
        return "bg-purple-50 text-purple-700 border-purple-200 ring-purple-500/10";
      case "Rejected":
        return "bg-rose-50 text-rose-700 border-rose-200 ring-rose-500/10";
      case "Applied":
      default:
        return "bg-blue-50 text-blue-700 border-blue-200 ring-blue-500/10";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/80 text-slate-800 p-4 sm:p-8 space-y-6">
      <div className="mx-auto max-w-7xl">
        {/* Top Navigation & Actions */}
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors px-3 py-1.5 rounded-lg hover:bg-slate-100"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </Link>

          <Link
            href={`/dashboard/applications/${application._id}/edit`}
            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white text-sm font-medium rounded-xl shadow-sm hover:shadow transition-all duration-200"
          >
            <Edit3 className="w-4 h-4" />
            <span>Edit Application</span>
          </Link>
        </div>

        {/* Main Header / Hero Card */}
        <div className="bg-white border border-slate-200/80 p-6 sm:p-8 rounded-3xl shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2.5">
                <div className="p-2.5 bg-white border border-slate-200/80 rounded-xl shadow-sm text-slate-700">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                    {application.company}
                  </h1>
                  <p className="text-sm font-medium text-slate-500 flex items-center gap-1.5 mt-0.5">
                    <Briefcase className="w-4 h-4 text-slate-400" />
                    {application.role}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider border ring-1 ${getStatusColor(
                  application.status,
                )}`}
              >
                {application.status}
              </span>
            </div>
          </div>

          {/* Metadata Details Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-4 border-t border-slate-200/60 text-xs">
            {/* Location */}
            <div className="bg-slate-50/80 border border-slate-200/70 p-3 rounded-xl space-y-1 transition hover:border-slate-300">
              <span className="text-slate-400 font-medium flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                Location
              </span>
              <p className="font-semibold text-slate-700 truncate">
                {application.location || "Not specified"}
              </p>
            </div>

            {/* Salary */}
            <div className="bg-slate-50/80 border border-slate-200/70 p-3 rounded-xl space-y-1 transition hover:border-slate-300">
              <span className="text-slate-400 font-medium flex items-center gap-1">
                <DollarSign className="w-3.5 h-3.5" />
                Salary
              </span>
              <p className="font-semibold text-slate-700 truncate">
                {application.salary || "Not specified"}
              </p>
            </div>

            {/* Follow-up Date */}
            <div className="bg-slate-50/80 border border-slate-200/70 p-3 rounded-xl space-y-1 transition hover:border-slate-300">
              <span className="text-slate-400 font-medium flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                Follow-Up
              </span>
              <p className="font-semibold text-slate-700 truncate">
                {application.followUpDate
                  ? new Date(application.followUpDate).toLocaleDateString(
                      "en-GB",
                    )
                  : "Not set"}
              </p>
            </div>

            {/* Job URL */}
            <div className="bg-slate-50/80 border border-slate-200/70 p-3 rounded-xl space-y-1 transition hover:border-slate-300">
              <span className="text-slate-400 font-medium flex items-center gap-1">
                <ExternalLink className="w-3.5 h-3.5" />
                Job Post
              </span>
              {application.jobUrl ? (
                <a
                  href={
                    application.jobUrl.startsWith("http")
                      ? application.jobUrl
                      : `https://${application.jobUrl}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-blue-600 hover:text-blue-700 hover:underline truncate block"
                >
                  View Listing ↗
                </a>
              ) : (
                <p className="font-semibold text-slate-400">None</p>
              )}
            </div>

            {/* Created At */}
            <div className="bg-slate-50/80 border border-slate-200/70 p-3 rounded-xl space-y-1 transition hover:border-slate-300">
              <span className="text-slate-400 font-medium flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                Applied On
              </span>
              <p className="font-semibold text-slate-700 truncate">
                {new Date(application.createdAt).toLocaleDateString("en-GB")}
              </p>
            </div>

            {/* Last Updated */}
            <div className="bg-slate-50/80 border border-slate-200/70 p-3 rounded-xl space-y-1 transition hover:border-slate-300">
              <span className="text-slate-400 font-medium flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                Updated
              </span>
              <p className="font-semibold text-slate-700 truncate">
                {new Date(application.updatedAt).toLocaleDateString("en-GB")}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200/80 p-6 rounded-2xl shadow-sm">
          <ApplicationNotes
            applicationId={application._id.toString()}
            initialNotes={application.notes || ""}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 lg:col-span-2 space-y-6">
          {/* Notes Card */}

          {/* Interviews Schedule Form */}
          <div className="bg-white border border-slate-200/80 p-6 rounded-2xl shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-slate-800">
              Schedule Interview
            </h2>
            <InterviewForm applicationId={application._id.toString()} />
          </div>

          {/* Interviews List */}
          <div className="bg-white border border-slate-200/80 p-6 rounded-2xl shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-slate-800">
              Interview Rounds
            </h2>
            <div className="flex flex-col justify-center items-center  border border-slate-200/80 p-6 rounded-2xl shadow-sm space-y-4">
              <InterviewList interviews={interviews} />
            </div>
          </div>

        </div>
          <div className="bg-white border border-slate-200/80 p-6 rounded-2xl shadow-sm">
            <RecruiterSection applicationId={application._id.toString()} />
          </div>

        {/* Application Timeline */}

        <div className="bg-white border border-slate-200/80 p-6 rounded-2xl shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-slate-800">
            Application Timeline
          </h2>
          <ApplicationTimeline applicationId={application._id.toString()} />
        </div>

        {/* Main Content Layout: 2-Column Grid */}
        <div className="">
          {/* Left Column (2/3 width) - Notes, Interviews & Timeline */}

          {/* Right Column (1/3 width) - Recruiter & Attachments */}
          <div className="space-y-6">
            {/* Recruiter & Contacts */}

            {/* File Upload & Attachments */}
            <div className="bg-white border border-slate-200/80 p-6 rounded-2xl shadow-sm space-y-4">
              <FileUpload applicationId={application._id.toString()} />
              <AttachmentList applicationId={application._id.toString()} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
