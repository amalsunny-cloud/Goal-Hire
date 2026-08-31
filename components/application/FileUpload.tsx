"use client";

import { useState } from "react";
import toast from "react-hot-toast";

interface FileUploadProps  {
  applicationId: string;
}

export default function FileUpload({ applicationId }: FileUploadProps ) {
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

     const one =  await fetch("/api/attachments", {
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
    <div className="p-6 flex flex-col justify-center items-center">
      <h2 className="text-2xl tracking-tight font-semibold mb-4">Attachments</h2>

      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="pl-10 pr-9 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 transition-all"
      />

    {file && (
      <div className="mt-2 text-sm text-gray-600">
        <p>
          <strong>Selected:</strong> {file.name}
        </p>

        <p>
          {(file.size / 1024).toFixed(1)} KB
        </p>
      </div>
    )}

      <button
        onClick={handleUpload} disabled={!file} type="button"
        className="mt-4 bg-black hover:bg-gray-700 text-white px-4 py-2 rounded-xl cursor-pointer disabled:opacity-50 transition-colors w-full sm:w-auto"
      >
        Upload
      </button>
    </div>
  );
}
