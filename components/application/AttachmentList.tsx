"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Attachment {
  _id: string;
  fileName: string;
  fileUrl: string;
}

interface AttachmentListProps {
  applicationId: string;
}

export default function AttachmentList({
  applicationId,
}: AttachmentListProps) {
  const [attachments, setAttachments] = useState<Attachment[]>([]);

  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    fetchAttachments();
  }, [applicationId]);

  const fetchAttachments = async () => {
    try {
      const response = await fetch(
        `/api/attachments?applicationId=${applicationId}`,
      );

      if (!response.ok) {
        throw new Error("Failed to load attachments.");
      }

      const data = await response.json();
      setAttachments(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-6 flex items-start gap-3 border-b border-slate-100 pb-5">
          <div className="h-10 w-10 animate-pulse rounded-xl bg-slate-100" />

          <div className="space-y-2">
            <div className="h-5 w-36 animate-pulse rounded-md bg-slate-100" />
            <div className="h-3 w-48 animate-pulse rounded-md bg-slate-100" />
          </div>
        </div>

        <div className="space-y-3">
          <div className="h-16 animate-pulse rounded-2xl bg-slate-50" />
          <div className="h-16 animate-pulse rounded-2xl bg-slate-50" />
        </div>
      </div>
    );
  }

  const deleteAttachment = async (attachmentId: string) => {
    try {
      if (!confirm("Delete this attachment?")) {
        return;
      }

      const response = await fetch(`/api/attachments/${attachmentId}`, {
        method: "DELETE",
      });

      console.log("attachment deleted..");
      toast.success("Attachment deleted.");

      if (!response.ok) {
        throw new Error("Failed to delete attachment.");
      }

      setAttachments((prev) =>
        prev.filter((attachment) => attachment._id !== attachmentId),
      );
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete attachment.");
    }
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      {/* Header */}
      <div className="mb-6 flex items-start justify-between gap-4 border-b border-slate-100 pb-5">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-600">
            <span className="text-lg">📁</span>
          </div>

          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
              Uploaded Files
            </h2>

            <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
              Documents attached to this application.
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-blue-100 bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-600">
          {attachments.length}{" "}
          {attachments.length === 1 ? "File" : "Files"}
        </div>
      </div>

      {/* Empty State */}
      {attachments.length === 0 ? (
        <div className="flex min-h-40 items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/60 px-6">
          <div className="text-center">
            <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-lg">
              📎
            </div>

            <p className="text-sm font-semibold text-slate-700">
              No attachments yet
            </p>

            <p className="mt-1 text-xs leading-5 text-slate-400">
              Uploaded application documents will appear here.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {attachments.map((attachment) => (
            <div
              key={attachment._id}
              className="group flex flex-col gap-4 rounded-2xl border border-slate-100 bg-slate-50/60 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-200 hover:bg-white hover:shadow-sm sm:flex-row sm:items-center sm:justify-between"
            >
              {/* File Info */}
              <a
                href={attachment.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-w-0 items-center gap-3"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-600 transition-colors duration-200 group-hover:bg-blue-100">
                  📄
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-slate-800 transition-colors duration-200 group-hover:text-blue-600">
                    {attachment.fileName}
                  </p>

                  <p className="mt-0.5 text-xs text-slate-400">
                    Click to view file
                  </p>
                </div>
              </a>

              {/* Delete */}
              <button
                type="button"
                aria-label={`Delete ${attachment.fileName}`}
                disabled={deletingId === attachment._id}
                onClick={() => deleteAttachment(attachment._id)}
                className="inline-flex w-full cursor-pointer items-center justify-center rounded-xl border border-rose-100 bg-white px-4 py-2.5 text-xs font-semibold text-rose-600 transition-all duration-200 hover:border-rose-200 hover:bg-rose-50 hover:text-rose-700 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
              >
                🗑️ Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}