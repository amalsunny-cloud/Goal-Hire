"use client";

import { useState } from "react";

interface Props {
  applicationId: string;
}

export default function FileUpload({ applicationId }: Props) {
  const [file, setFile] = useState<File | null>(null);

  const handleUpload = async () => {
    if (!file) {
      return;
    }

    console.log("Selected File:", file);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/attachments/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log("Upload Response:", data);

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

      console.log("One is:",one);
      
    } catch (error) {
      console.error("Upload Error", error);
    }
  };

  return (
    <div className="border rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Attachments</h2>

      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="w-full text-sm text-gray-500
    file:mr-4 file:py-2 file:px-4
    file:rounded-md file:border-0
    file:text-sm file:font-semibold
    file:bg-black file:text-white
    hover:file:bg-gray-800
    cursor-pointer border border-gray-200 rounded-lg pr-4"
      />

      <button
        onClick={handleUpload}
        className="mt-4 bg-black text-white px-4 py-2 rounded"
      >
        Upload
      </button>
    </div>
  );
}
