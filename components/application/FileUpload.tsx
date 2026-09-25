"use client";

import { useState } from "react";
import toast from "react-hot-toast";

interface FileUploadProps {
  applicationId: string;
}

export default function FileUpload({ applicationId }: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/attachments/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed.");
      }

      const data = await response.json();

      const one = await fetch("/api/attachments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          applicationId,
          fileName: data.originalName,
          fileUrl: data.url,
        }),
      });

      toast.success("File uploaded successfully.");
      setFile(null);
    } catch (error) {
      console.error("Upload Error", error);
      toast.error("Upload failed.");
    }
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 ">
      {/* Header */}
      <div className="mb-6 flex items-start gap-3 border-b border-slate-100 pb-5">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-600">
          <span className="text-lg">📎</span>
        </div>

        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
            Attachments
          </h2>

          <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
            Upload resumes, cover letters, or other application documents.
          </p>
        </div>
      </div>

      {/* Upload Area */}
      <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50/60 p-5 transition-colors duration-200 hover:border-blue-300 hover:bg-blue-50/30 sm:p-6">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-100 bg-white text-blue-600 shadow-sm">
            <span className="text-xl">⬆️</span>
          </div>

          <p className="text-sm font-semibold text-slate-700">
            Choose a file to upload
          </p>

          <p className="mt-1 text-xs text-slate-400">
            Select a document from your device.
          </p>

          <label className="mt-4 inline-flex cursor-pointer items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50 hover:shadow-sm">
            Browse Files
            <input
              type="file"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Selected File */}
      {file && (
        <div className="mt-4 flex flex-col gap-3 rounded-2xl border border-blue-100 bg-blue-50/50 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-blue-100 bg-white text-blue-600">
              📄
            </div>

            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
                Selected File
              </p>

              <p className="mt-1 truncate text-sm font-semibold text-slate-800">
                {file.name}
              </p>

              <p className="mt-0.5 text-xs text-slate-500">
                {(file.size / 1024).toFixed(1)} KB
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Upload Button */}
      <div className="mt-5 flex justify-end border-t border-slate-100 pt-5">
        <button
          onClick={handleUpload}
          disabled={!file}
          type="button"
          className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-sm disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0 sm:w-auto"
        >
          <span>↑</span>
          Upload File
        </button>
      </div>
    </div>
  );
}