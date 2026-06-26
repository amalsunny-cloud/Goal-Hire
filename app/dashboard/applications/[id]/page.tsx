
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

interface Props {
  params: Promise<{ id: string }>;
}
export default async function ApplicationDetailsPage({ params }: Props) {

  await connectDB();

  const user = await getUser();

  if (!user) {
    return <div>Unauthorized</div>;
  }

  const { id } = await params;

  const application = await getApplication(id, user.userId);

  if (!application) {
    return <div>Application not found</div>;
  }

  const rawInterviews = await getInterviews(application._id.toString());

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
  
  return (
    <>
      <Link href={"/dashboard"} className="text-red-400">
        ← Back to Dashboard
      </Link>
      <div className="p-6 space-y-4">
        <h1 className="text-3xl font-bold mt-2">{application.company}</h1>
        <h2 className="font-semibold">Role : {application.role}</h2>

        <h2 className="font-semibold">Status : {application.status}</h2>

        <div>
          <ApplicationNotes
            applicationId={application._id.toString()}
            initialNotes={application.notes || ""}
          />
        </div>

        <FileUpload applicationId={application._id.toString()} />
        <AttachmentList applicationId={application._id.toString()} />

        <div>
          <h2 className="font-semibold">
            Follow Up Date :{" "}
            {application.followUpDate
              ? new Date(application.followUpDate).toLocaleDateString()
              : "Not Set"}
          </h2>
        </div>

        <div>
          <h2 className="font-semibold">
            Job Posting :{" "}
            {application.jobUrl ? (
              <a
                href={
                  application.jobUrl.startsWith("http")
                    ? application.jobUrl
                    : `https://${application.jobUrl}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="
          text-blue-500
          underline
        "
              >
                Open Job Posting
              </a>
            ) : (
              <p>No URL</p>
            )}
          </h2>
        </div>

        <div>
          <h2 className="font-semibold">
            Location : {application.location || "Not specified"}
          </h2>
        </div>

        <div>
          <h2 className="font-semibold">
            Salary : {application.salary || "Not specified"}
          </h2>
        </div>

        <div>
          <h2 className="font-semibold">
            Created : {new Date(application.createdAt).toLocaleDateString()}
          </h2>
        </div>

        <div>
          <h2 className="font-semibold">
            Last Updated :{" "}
            {new Date(application.updatedAt).toLocaleDateString()}
          </h2>
        </div>

        <Link
          href={`/dashboard/applications/${application._id}/edit`}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Edit Application
        </Link>

        <InterviewForm applicationId={application._id.toString()} />

        <RecruiterSection applicationId={application._id.toString()}/>

        <InterviewList interviews={interviews} />

        <ApplicationTimeline applicationId={application._id.toString()} />

  
      </div>
    </>
  );
}
