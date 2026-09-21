"use client";

import { Recruiter } from "@/types/recruiter";
import { RecruiterCommunication } from "@/types/recruiterCommunication";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface Props {
  recruiters: Recruiter[];
  communications: RecruiterCommunication[];
}

export default function RecruiterExport({
  recruiters,
  communications,
}: Props) {
  const hasData = recruiters.length > 0;

  const exportCSV = () => {
    if (!hasData) return;
    const rows = recruiters.map((recruiter) => {
      const communicationCount = communications.filter(
        (communication) =>
          communication.recruiterId === recruiter._id,
      ).length;

      const positiveResponses = communications.filter(
        (communication) =>
          communication.recruiterId === recruiter._id &&
          communication.responseType === "Positive",
      ).length;

      return {
        Name: recruiter.name,
        Email: recruiter.email ?? "",
        Phone: recruiter.phone ?? "",
        LastContact: recruiter.lastContact
          ? new Date(recruiter.lastContact).toLocaleDateString("en-GB")
          : "",
        NextFollowUp: recruiter.nextFollowUp
          ? new Date(recruiter.nextFollowUp).toLocaleDateString("en-GB")
          : "",
        Communications: communicationCount,
        PositiveResponses: positiveResponses,
      };
    });

    const headers = Object.keys(rows[0] ?? {});

    const csv = [
      headers.join(","),

      ...rows.map((row) =>
        headers
          .map((header) =>
            `"${String(
              row[header as keyof typeof row] ?? "",
            ).replace(/"/g, '""')}"`,
          )
          .join(","),
      ),
    ].join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download = "Recruiters.csv";

    link.click();

    URL.revokeObjectURL(url);
  };

  const exportPDF = () => {
    if (!hasData) return;

    const doc = new jsPDF();

    doc.setFontSize(18);

    doc.text("Recruiter Report", 14, 20);

    autoTable(doc, {
      startY: 30,

      head: [[
        "Recruiter",
        "Email",
        "Phone",
        "Communications",
        "Positive",
        "Next Follow-up",
      ]],

      body: recruiters.map((recruiter) => {
        const recruiterCommunications =
          communications.filter(
            (communication) =>
              communication.recruiterId === recruiter._id,
          );

        const positive =
          recruiterCommunications.filter(
            (communication) =>
              communication.responseType === "Positive",
          ).length;

        return [
          recruiter.name ?? "",
          recruiter.email ?? "",
          recruiter.phone ?? "",
          recruiterCommunications.length.toString(),
          positive.toString(),
          recruiter.nextFollowUp
            ? new Date(
                recruiter.nextFollowUp,
              ).toLocaleDateString("en-GB")
            : "-",
        ];
      }),
    });

    doc.save("Recruiters.pdf");
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      {/* Header */}
      <div className="mb-6 flex flex-col items-center text-center">
        <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-600">
          <span className="text-lg">📤</span>
        </div>

        <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
          Export Recruiter Data
        </h2>

        <p className="mt-1 max-w-md text-xs leading-5 text-slate-500 sm:text-sm">
          Download your recruiter information and communication data for
          offline use.
        </p>
      </div>

      {/* Export Buttons */}
      <div className="flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
        <button
          onClick={exportCSV}
          disabled={!hasData}
          className={`inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-200 sm:w-auto ${
            hasData
              ? "cursor-pointer border border-emerald-600 bg-emerald-600 text-white shadow-sm hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-sm"
              : "cursor-not-allowed border border-slate-200 bg-slate-100 text-slate-400"
          }`}
        >
          <span>↓</span>
          Export CSV
        </button>

        <button
          onClick={exportPDF}
          disabled={!hasData}
          className={`inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-200 sm:w-auto ${
            hasData
              ? "cursor-pointer border border-rose-600 bg-rose-600 text-white shadow-sm hover:-translate-y-0.5 hover:bg-rose-700 hover:shadow-sm"
              : "cursor-not-allowed border border-slate-200 bg-slate-100 text-slate-400"
          }`}
        >
          <span>↓</span>
          Export PDF
        </button>
      </div>

      {/* Empty State */}
      {!hasData && (
        <div className="mt-5 flex items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/60 px-4 py-3">
          <p className="text-xs font-medium text-slate-500">
            💡 Add recruiter data to enable export options.
          </p>
        </div>
      )}
    </div>
  );
}