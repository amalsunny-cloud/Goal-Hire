"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function EditApplicationForm({ application }: any) {
  const [company, setCompany] = useState(application?.company || "");
  const [role, setRole] = useState(application?.role || "");
  const [status, setStatus] = useState(application?.status || "Applied");
  const [notes, setNotes] = useState(application?.notes || "");
  const [error, setError] = useState("");
  const router = useRouter();

  const isUnchanged =
    company.trim() === (application?.company || "") &&
    role.trim() === (application?.role || "") &&
    status === (application?.status || "Applied") &&
    notes.trim() === (application?.notes || "");

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!company.trim() || !role.trim()) {
      setError("Please fill out the fields");
      return;
    }

    try {
      const response = await fetch(`/api/applications/${application._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          company,
          role,
          status,
          notes,
        }),
      });

      if (response.ok) {
        router.refresh();
        router.push(`/dashboard/applications/${application._id}`);
      } else {
        const data = await response.json();
        setError(data.error || "Something went wrong");
      }
    } catch (error) {
      setError("Failed to communicate with server");
    }
  };
  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {error && (
        <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg">
          {error}
        </div>
      )}

      {isUnchanged && (
        <div className="p-2 text-xs text-gray-500 bg-gray-50 border border-gray-200 rounded text-center">
          You haven't made any edits to this application yet.
        </div>
      )}


      <input
        type="text"
        className="border p-2 w-full"
        placeholder="company"
        onChange={(e) => setCompany(e.target.value)}
        value={company}
      />
      <input
        type="text"
        className="border p-2 w-full"
        placeholder="role"
        onChange={(e) => setRole(e.target.value)}
        value={role}
      />
      <textarea
        className="border p-2 w-full"
        placeholder="notes"
        onChange={(e) => setNotes(e.target.value)}
        value={notes}
      ></textarea>
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="">Applied</option>
        <option value="">Interview</option>
        <option value="">Offer</option>
        <option value="">Rejected</option>
      </select>

      <button type="submit" disabled={isUnchanged} className={`px-4 py-2 rounded font-medium w-full transition-all duration-200 ${
          isUnchanged 
            ? "bg-gray-300 text-gray-500 cursor-not-allowed opacity-60" // 🎨 Faded Styles
            : "bg-black text-white hover:bg-gray-800 cursor-pointer"   // 🔥 Active Styles
        }`}>
        Save Changes
      </button>
    </form>
  );
}
