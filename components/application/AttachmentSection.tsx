"use client";

import { useState } from "react";
import AttachmentList from "./AttachmentList";
import FileUpload from "./FileUpload";

interface AttachmentSectionProps {
  applicationId: string;
}

export default function AttachmentSection({
  applicationId,
}: AttachmentSectionProps) {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="bg-white border border-slate-200/80 p-6 rounded-2xl shadow-sm space-y-4 mt-4">
      <FileUpload
        applicationId={applicationId}
        onUploadSuccess={() =>
          setRefreshKey((previous) => previous + 1)
        }
      />

      <AttachmentList
        applicationId={applicationId}
        refreshKey={refreshKey}
      />
    </div>
  );
}
