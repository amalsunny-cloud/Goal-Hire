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
      <h2 className="text-xl font-semibold mb-4">Attachments</h2>

      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="w-full max-w-sm text-sm text-gray-500
    file:mr-4 file:py-2 file:px-4
    file:rounded-md file:border-0
    file:text-sm file:font-semibold
    file:bg-black file:text-white
    hover:file:bg-gray-800
    cursor-pointer border border-gray-200 rounded-lg pr-4"
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
        className="mt-4 bg-black hover:bg-gray-800 text-white px-4 py-2 rounded disabled:opacity-50 transition-colors w-full sm:w-auto"
      >
        Upload
      </button>
    </div>
  );
}
