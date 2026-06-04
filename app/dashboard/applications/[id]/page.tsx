import { connectDB } from "@/lib/db";
import { getApplication } from "@/lib/getApplication";
import { getUser } from "@/lib/getUser";

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
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-3xl font-bold">{application.company}</h1>
      <p>
        Role:
        {application.role}
      </p>

      <p>
        Status:
        {application.status}
      </p>

      <div>
        <h2 className="font-semibold">Notes :</h2>

        <p>{application.notes || "No notes added"}</p>
      </div>

      <div>
        <h2 className="font-semibold">Follow Up Date :</h2>
        <p>
          {application.followUpDate
            ? new Date(application.followUpDate).toLocaleDateString()
            : "Not Set"}
        </p>
      </div>

      <div>
        <h2 className="font-semibold">Job Posting :</h2>

        {application.jobUrl ? (
          <a
            href={application.jobUrl}
            target="_blank"
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
      </div>

      <div>
        <h2 className="font-semibold">Location :</h2>

        <p>{application.location || "Not specified"}</p>
      </div>

      <div>
        <h2 className="font-semibold">Salary :</h2>

        <p>{application.salary || "Not specified"}</p>
      </div>

      <div>
        <h2 className="font-semibold">Created :</h2>

        <p>{new Date(application.createdAt).toLocaleDateString()}</p>
      </div>

      <div>
        <h2 className="font-semibold">Last Updated :</h2>

        <p>{new Date(application.updatedAt).toLocaleDateString()}</p>
      </div>
    </div>
  );
}
