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

  const exportCSV = () => {
    const rows = recruiters.map((recruiter) => {
      const communicationCount = communications.filter(
        (communication) =>
          communication.recruiterId === recruiter._id
      ).length;

      const positiveResponses = communications.filter(
        (communication) =>
          communication.recruiterId === recruiter._id &&
          communication.responseType === "Positive"
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
              row[header as keyof typeof row] ?? ""
            ).replace(/"/g, '""')}"`
          )
          .join(",")
      ),
    ].join("\n");

    const blob = new Blob(
      [csv],
      {
        type: "text/csv;charset=utf-8;",
      }
    );

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download = "Recruiters.csv";

    link.click();

    URL.revokeObjectURL(url);
  };

  const exportPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);

    doc.text(
      "Recruiter Report",
      14,
      20
    );

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
              communication.recruiterId === recruiter._id
          );

        const positive =
          recruiterCommunications.filter(
            (communication) =>
              communication.responseType === "Positive"
          ).length;

        return [
          recruiter.name ?? "",

          recruiter.email ?? "",

          recruiter.phone ?? "",

          recruiterCommunications.length.toString(),

          positive.toString(),

          recruiter.nextFollowUp
            ? new Date(
                recruiter.nextFollowUp
              ).toLocaleDateString("en-GB")
            : "-",
        ];
      }),
    });

    doc.save("Recruiters.pdf");
  };

  return (
    <div className="border rounded-lg p-6 bg-white shadow-sm">

      <h2 className="text-xl font-semibold mb-5">
        Export Recruiter Data
      </h2>

      <div className="flex gap-4">

        <button
          onClick={exportCSV}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Export CSV
        </button>

        <button
          onClick={exportPDF}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Export PDF
        </button>

      </div>

    </div>
  );
}