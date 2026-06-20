"use client"
import { useState } from "react";

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
  return (
    <div className="border rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Uploaded Files</h2>
      {attachments.length === 0 ? (
        <p className="text-red-500">No attachments yet.</p>
      ) : (
        <div className="space-y-3">
          {attachments.map((attachment) => (
            <a
              key={attachment._id}
              href={attachment.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="
                  block
                  border
                  rounded
                  p-3
                  hover:bg-gray-50
                "
            >
              📄 {attachment.fileName}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
