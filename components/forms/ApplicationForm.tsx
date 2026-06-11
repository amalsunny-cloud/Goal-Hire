"use client";

import { Application } from "@/types/application";
import { useState } from "react";
import toast from "react-hot-toast";

interface FormProps {
  onAddSuccess: (newApp: Application) => void;
}

export default function ApplicationForm({ onAddSuccess }: FormProps) {
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [note, setNote] = useState("");
  const [followUpDate, setFollowUpDate] = useState("");
  const [jobUrl, setJobUrl] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await fetch("api/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          company,
          role,
          note,
          followUpDate,
          jobUrl,
          location,
          salary,
        }),
      });

      if (!response.ok) {
        toast.error("Error adding application");
        throw new Error("Error adding application");
      }

      const savedApplication = await response.json();
      onAddSuccess(savedApplication);
      toast.success("Application added");
      setCompany("");
      setRole("");
      setNote("");
      setFollowUpDate("");
      setJobUrl("");
      setLocation("");
      setSalary("");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Company"
        className="border p-2 w-full rounded-lg"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />
      <input
        type="text"
        placeholder="Role"
        className="border p-2 w-full rounded-lg"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      />
      <input
        type="text"
        placeholder="Notes"
        className="border p-2 w-full rounded-lg"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />
      <input
        type="date"
        placeholder="Follow Up Date"
        className="border p-2 w-full rounded-lg"
        value={followUpDate}
        onChange={(e) => setFollowUpDate(e.target.value)}
      />
      <input
        type="text"
        placeholder="Job URL"
        className="border p-2 w-full rounded-lg"
        value={jobUrl}
        onChange={(e) => setJobUrl(e.target.value)}
      />
      <input
        type="text"
        placeholder="Location"
        className="border p-2 w-full rounded-lg"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <input
        type="text"
        placeholder="Salary"
        className="border p-2 w-full rounded-lg"
        value={salary}
        onChange={(e) => setSalary(e.target.value)}
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-green-600 text-white px-4 py-2 rounded-lg disabled:opacity-50"
      >
        {loading ? "Adding..." : "Add Application"}
      </button>
    </form>
  );
}
