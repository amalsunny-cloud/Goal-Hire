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
      {/* Back */}
      <div className="mx-auto mt-5 w-full max-w-5xl px-4 sm:px-6">
        <Link
          href={`/dashboard/applications/${application._id}`}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm font-semibold text-slate-600 shadow-sm transition-all duration-200 hover:-translate-x-0.5 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
        >
          <span>←</span>
          Back to Application
        </Link>
      </div>

      {/* Main Card */}
      <div className="mx-auto mt-5 w-full max-w-5xl rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7 lg:p-8">
        {/* Header */}
        <div className="mb-8 flex items-start justify-between gap-4 border-b border-slate-100 pb-6">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-600">
              <span className="text-lg">✏️</span>
            </div>

            <div>
              <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                Edit Application
              </h2>

              <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
                Update the details of your job application.
              </p>
            </div>
          </div>

          <div className="hidden rounded-xl border border-blue-100 bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-600 sm:block">
            Application Details
          </div>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Unchanged Warning State */}
          {isUnchanged && (
            <div className="flex items-start gap-3 rounded-2xl border border-amber-100 bg-amber-50/70 p-4 text-sm text-amber-700">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white text-sm shadow-sm">
                ℹ️
              </div>

              <div>
                <p className="font-semibold">No changes yet</p>

                <p className="mt-0.5 text-xs leading-5 text-amber-600">
                  You haven't made any edits to this application yet.
                </p>
              </div>
            </div>
          )}

          {/* Server Error Message Display */}
          {error && (
            <div className="flex items-start gap-3 rounded-2xl border border-rose-100 bg-rose-50 p-4 text-sm text-rose-700">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white text-sm shadow-sm">
                ⚠️
              </div>

              <div>
                <p className="font-semibold">Something went wrong</p>

                <p className="mt-0.5 text-xs leading-5 text-rose-600">
                  {error}
                </p>
              </div>
            </div>
          )}

          {/* Company & Role */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="text-start">
              <label
                htmlFor="company"
                className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500"
              >
                Company <span className="text-rose-500">*</span>
              </label>

              <input
                id="company"
                type="text"
                className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-all duration-200 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                placeholder="e.g. Acme Corp"
                onChange={(e) => setCompany(e.target.value)}
                value={company}
              />
            </div>

            <div className="text-start">
              <label
                htmlFor="role"
                className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500"
              >
                Role / Position <span className="text-rose-500">*</span>
              </label>

              <input
                id="role"
                type="text"
                className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-all duration-200 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                placeholder="e.g. Frontend Engineer"
                onChange={(e) => setRole(e.target.value)}
                value={role}
              />
            </div>
          </div>

          {/* Status & Salary */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="text-start">
              <label
                htmlFor="status"
                className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500"
              >
                Status
              </label>

              <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full cursor-pointer appearance-none rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm font-medium text-slate-700 outline-none transition-all duration-200 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
              >
                <option value="Applied">Applied</option>
                <option value="Interview">Interview</option>
                <option value="Offer">Offer</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            <div className="text-start">
              <label
                htmlFor="salary"
                className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500"
              >
                Salary ($)
              </label>

              <input
                id="salary"
                type="number"
                placeholder="e.g. 120000"
                value={salary}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-all duration-200 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                onChange={(e) => setSalary(e.target.value)}
              />
            </div>
          </div>

          {/* Follow Up, Job URL & Location */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <div className="text-start">
              <label
                htmlFor="followUpDate"
                className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500"
              >
                Follow-Up Date
              </label>

              <input
                id="followUpDate"
                type="date"
                value={followUpDate}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-700 outline-none transition-all duration-200 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                onChange={(e) => setFollowUpDate(e.target.value)}
              />
            </div>

            <div className="text-start">
              <label
                htmlFor="jobUrl"
                className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500"
              >
                Job URL
              </label>

              <input
                id="jobUrl"
                type="url"
                placeholder="https://..."
                value={jobUrl}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-all duration-200 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                onChange={(e) => setJobUrl(e.target.value)}
              />
            </div>

            <div className="text-start">
              <label
                htmlFor="location"
                className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500"
              >
                Location
              </label>

              <input
                id="location"
                type="text"
                placeholder="e.g. Remote / NYC"
                value={location}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-all duration-200 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>

          {/* Notes */}
          <div className="text-start">
            <label
              htmlFor="notes"
              className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500"
            >
              Notes
            </label>

            <textarea
              id="notes"
              rows={4}
              className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm leading-6 text-slate-800 placeholder:text-slate-400 outline-none transition-all duration-200 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
              placeholder="Add relevant notes about interviews, contacts, or requirements..."
              onChange={(e) => setNotes(e.target.value)}
              value={notes}
            ></textarea>
          </div>

          {/* Submit */}
          <div className="flex flex-col items-stretch gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:items-center sm:justify-end">
            <Link
              href={`/dashboard/applications/${application._id}`}
              className="inline-flex w-full items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-600 transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 sm:w-auto"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={isUnchanged || isSubmitting}
              className={`inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold shadow-sm transition-all duration-200 sm:w-auto ${
                isUnchanged || isSubmitting
                  ? "cursor-not-allowed bg-slate-200 text-slate-400"
                  : "cursor-pointer bg-slate-900 text-white hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-sm"
              }`}
            >
              {isSubmitting && (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              )}

              {isSubmitting ? "Saving Changes..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}