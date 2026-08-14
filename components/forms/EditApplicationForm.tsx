"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function EditApplicationForm({ application }: any) {
  const [company, setCompany] = useState(application?.company || "");
  const [role, setRole] = useState(application?.role || "");
  const [status, setStatus] = useState(application?.status || "Applied");
  const [notes, setNotes] = useState(application?.notes || "");
  const [salary, setSalary] = useState(application?.salary || "");
  const [followUpDate, setFollowUpDate] = useState(
    application?.followUpDate || "",
  );
  const [jobUrl, setJobUrl] = useState(application?.jobUrl || "");
  const [location, setLocation] = useState(application?.location || "");

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const isUnchanged =
    company.trim() === (application?.company || "") &&
    role.trim() === (application?.role || "") &&
    status === (application?.status || "Applied") &&
    notes.trim() === (application?.notes || "") &&
    String(salary).trim() === String(application?.salary || "").trim() &&
    jobUrl.trim() === (application?.jobUrl || "") &&
    location.trim() === (application?.location || "") &&
    followUpDate.trim() === (application?.followUpDate || "");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!company.trim() || !role.trim()) {
      setError("Company and Role are required fields.");
      toast("Please fill out the required fields!", {
        icon: "⚠️",
        style: {
          background: "#facc15",
          color: "#000",
        },
      });
      return;
    }

    try {
      setIsSubmitting(true);
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
          followUpDate,
          jobUrl,
          location,
          salary,
        }),
      });

      if (response.ok) {
        toast.success("Application updated successfully");

        setTimeout(() => {
          router.refresh();
          router.push(`/dashboard/applications/${application._id}`);
        }, 1000);
      } else {
        const data = await response.json();
        setError(data.error || "Something went wrong");
        toast.error(data.error || "Something went wrong");
      }
    } catch (err) {
      setError("Failed to communicate with server");
      toast.error("Failed to communicate with server");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
    <div className="ml-5 pl-5 mt-4 text-start">
      <Link href={`/dashboard/applications/${application._id}`}>← Back</Link>
    </div>
    
    <div className="w-[90%] mx-auto bg-slate-400/10 rounded-xl shadow-sm p-6 sm:p-8 mt-4">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-900">
          Edit Application
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Update the details of your job application.
        </p>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit}>
        {/* Unchanged Warning State */}
        {isUnchanged && (
          <div className="flex items-center gap-2 p-3 text-xs text-slate-600 border border-slate-200 dark:border-slate-700/50 rounded-lg">
            <span>ℹ️</span>
            <span>You haven't made any edits to this application yet.</span>
          </div>
        )}

        {/* Server Error Message Display */}
        {error && (
          <div className="p-3 text-xs text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-lg">
            {error}
          </div>
        )}

        {/* Grid: Company & Role */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="text-start">
            <label
              htmlFor="company"
              className="block text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 tracking-wider mb-1.5"
            >
              Company <span className="text-red-500">*</span>
            </label>
            <input
              id="company"
              type="text"
              className="w-full px-3.5 py-2 text-sm border-b border-slate-300 dark:border-slate-700 bg-transparent text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-100 transition-all"
              placeholder="e.g. Acme Corp"
              onChange={(e) => setCompany(e.target.value)}
              value={company}
            />
          </div>

          <div className="text-start">
            <label
              htmlFor="role"
              className="block text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 tracking-wider mb-1.5"
            >
              Role / Position <span className="text-red-500">*</span>
            </label>
            <input
              id="role"
              type="text"
              className="w-full px-3.5 py-2 text-sm border-b border-slate-300 dark:border-slate-700 bg-transparent text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-100 transition-all"
              placeholder="e.g. Frontend Engineer"
              onChange={(e) => setRole(e.target.value)}
              value={role}
            />
          </div>
        </div>

        {/* Grid: Status & Salary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="text-start">
            <label
              htmlFor="status"
              className="block text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 tracking-wider mb-1.5"
            >
              Status
            </label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-3.5 py-2 text-sm border-b border-slate-300 dark:border-slate-700 bg-transparent text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-100 transition-all cursor-pointer"
            >
              <option value="Applied" className="dark:bg-slate-900">Applied</option>
              <option value="Interview" className="dark:bg-slate-900">Interview</option>
              <option value="Offer" className="dark:bg-slate-900">Offer</option>
              <option value="Rejected" className="dark:bg-slate-900">Rejected</option>
            </select>
          </div>

          <div className="text-start">
            <label
              htmlFor="salary"
              className="block text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 tracking-wider mb-1.5"
            >
              Salary ($)
            </label>
            <input
              id="salary"
              type="number"
              placeholder="e.g. 120000"
              value={salary}
              className="w-full px-3.5 py-2 text-sm border-b border-slate-300 dark:border-slate-700 bg-transparent text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-100 transition-all"
              onChange={(e) => setSalary(e.target.value)}
            />
          </div>
        </div>

        {/* Grid: Follow Up, Job URL & Location */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="text-start">
            <label
              htmlFor="followUpDate"
              className="block text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 tracking-wider mb-1.5"
            >
              Follow-Up Date
            </label>
            <input
              id="followUpDate"
              type="date"
              value={followUpDate}
              className="w-full px-3.5 py-2 text-sm border-b border-slate-300 dark:border-slate-700 bg-transparent text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-100 transition-all"
              onChange={(e) => setFollowUpDate(e.target.value)}
            />
          </div>

          <div className="text-start">
            <label
              htmlFor="jobUrl"
              className="block text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 tracking-wider mb-1.5"
            >
              Job URL
            </label>
            <input
              id="jobUrl"
              type="url"
              placeholder="https://..."
              value={jobUrl}
              className="w-full px-3.5 py-2 text-sm border-b border-slate-300 dark:border-slate-700 bg-transparent text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-100 transition-all"
              onChange={(e) => setJobUrl(e.target.value)}
            />
          </div>

          <div className="text-start">
            <label
              htmlFor="location"
              className="block text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 tracking-wider mb-1.5"
            >
              Location
            </label>
            <input
              id="location"
              type="text"
              placeholder="e.g. Remote / NYC"
              value={location}
              className="w-full px-3.5 py-2 text-sm border-b border-slate-300 dark:border-slate-700 bg-transparent text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-100 transition-all"
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
        </div>

        {/* Textarea: Notes */}
        <div className="text-start">
          <label
            htmlFor="notes"
            className="block text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 tracking-wider mb-1.5"
          >
            Notes
          </label>
          <textarea
            id="notes"
            rows={4}
            className="w-full px-3.5 py-2 text-sm border-b border-slate-300 dark:border-slate-700 bg-transparent text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-100 transition-all resize-y"
            placeholder="Add relevant notes about interviews, contacts, or requirements..."
            onChange={(e) => setNotes(e.target.value)}
            value={notes}
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="pt-2 flex flex-col justify-center items-center">
          <button
            type="submit"
            disabled={isUnchanged || isSubmitting}
            className={`py-2.5 px-4 rounded-lg font-medium text-sm transition-all duration-200 flex justify-center items-center gap-2 ${
              isUnchanged || isSubmitting
                ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                : "bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200 cursor-pointer shadow-sm"
            }`}
          >
            {isSubmitting ? "Saving Changes..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
    </>
  );
}