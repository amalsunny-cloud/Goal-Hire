"use client";

import { useState } from "react";
import toast from "react-hot-toast";

interface Props {
  recruiterName: string;
  company: string;
}

const templates = {
  application: (recruiter: string, company: string) => `Hi ${recruiter},

I hope you're doing well.

I wanted to follow up regarding my application for the position at ${company}. I remain very interested in the opportunity and would appreciate any updates regarding the hiring process.

Thank you for your time.

Best regards,`,

  interview: (
    recruiter: string,
    company: string,
  ) => `Hi ${recruiter},

Thank you again for taking the time to interview me for the role at ${company}.

I enjoyed learning more about the position and the team. I'm excited about the opportunity and look forward to hearing from you.

Best regards,`,

  thankyou: (
    recruiter: string,
    company: string,
  ) => `Hi ${recruiter},

Thank you very much for your time and consideration.

I appreciate the opportunity to discuss the role at ${company}. It was a pleasure speaking with you.

Best regards,`,

  checking: (
    recruiter: string,
    company: string,
  ) => `Hi ${recruiter},

I hope you're doing well.

I'm just checking in regarding the position at ${company}. I understand everyone is busy, but I wanted to see if there were any updates.

Thank you.

Best regards,`,

  reconnect: (
    recruiter: string,
    company: string,
  ) => `Hi ${recruiter},

I hope you've been doing well.

I wanted to reconnect and stay in touch regarding opportunities at ${company}. Please keep me in mind if any suitable positions become available.

Best regards,`,
};

export default function EmailTemplates({
  recruiterName,
  company,
}: Props) {
  const [selected, setSelected] =
    useState<keyof typeof templates>("application");

  const email = templates[selected](recruiterName, company);

  const copy = async () => {
    await navigator.clipboard.writeText(email);
    toast.success("Copied to clipboard");
  };

  return (
    <div className="mt-5 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      {/* Header */}
      <div className="mb-6 flex items-start justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-indigo-100 bg-indigo-50 text-indigo-600">
              <span className="text-lg">✉️</span>
            </div>

            <div>
              <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                Email Templates
              </h2>

              <p className="mt-0.5 text-xs leading-5 text-slate-500 sm:text-sm">
                Choose a template and personalize your recruiter message.
              </p>
            </div>
          </div>
        </div>

        <div className="hidden rounded-xl border border-indigo-100 bg-indigo-50 px-3 py-2 text-xs font-semibold text-indigo-600 sm:block">
          Quick Reply
        </div>
      </div>

      {/* Template Selector */}
      <div className="mb-5">
        <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500">
          Select Template
        </label>

        <select
          className="w-full cursor-pointer appearance-none rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm font-medium text-slate-700 outline-none transition-all duration-200 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
          value={selected}
          onChange={(e) =>
            setSelected(
              e.target.value as keyof typeof templates,
            )
          }
        >
          <option value="application">
            Follow-up After Application
          </option>

          <option value="interview">
            Follow-up After Interview
          </option>

          <option value="thankyou">
            Thank You
          </option>

          <option value="checking">
            Checking In
          </option>

          <option value="reconnect">
            Keep In Touch
          </option>
        </select>
      </div>

      {/* Email Preview */}
      <div className="rounded-2xl border border-gray-200 bg-slate-50/60 p-1">
        <textarea
          readOnly
          value={email}
          rows={14}
          className="w-full resize-y rounded-xl bg-white px-4 py-4 text-sm leading-6 text-slate-700 outline-none"
        />
      </div>

      {/* Action */}
      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-5 text-slate-400">
          Copy the message and personalize it before sending.
        </p>

        <button
          onClick={copy}
          className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-sm sm:w-auto"
        >
          <span>⧉</span>
          Copy Email
        </button>
      </div>
    </div>
  );
}