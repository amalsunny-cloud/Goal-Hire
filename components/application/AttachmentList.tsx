"use client";
import { useEffect, useState } from "react";

interface Attachment {
  _id: string;
  fileName: string;
  fileUrl: string;
}
interface Props {
  applicationId: string;
}
export default function AttachmentList({ applicationId }: Props) {
  const [attachments, setAttachments] = useState<Attachment[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAttachments();
  }, []);

  const fetchAttachments = async () => {
    try {
      const response = await fetch(
        `/api/attachments?applicationId=${applicationId}`,
      );

      console.log("response in fetchAttachments is:", response);

      const data = await response.json();
      console.log("data in fetchAttachments is:", data);

      setAttachments(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading attachments...</p>;
  }

  const deleteAttachment = async (attachmentId: string) => {
    try {
      if (
  !confirm(
    "Delete this attachment?"
  )
) {
  return;
}
      const response = await fetch(`/api/attachments/${attachmentId}`, {
        method: "DELETE",
      });

      console.log("attachment deleted..");
      
      if (!response.ok) {
        throw new Error();
      }

      setAttachments(
        attachments.filter((attachment) => attachment._id !== attachmentId),
      );
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="border rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Uploaded Files</h2>
      {attachments.length === 0 ? (
        <p className="text-red-500">No attachments yet.</p>
      ) : (
        <div className="space-y-3">
          {attachments.map((attachment) => (
            <div
              key={attachment._id}
              className="border rounded p-3 flex justify-between items-center"
            >
              <a
                href={attachment.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                📄 {attachment.fileName}
              </a>

              <button onClick={() =>deleteAttachment(attachment._id)}className="text-red-500 font-medium">Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
