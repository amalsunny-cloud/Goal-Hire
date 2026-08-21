"use client";

import { Application } from "@/types/application";
import toast from "react-hot-toast";

interface ExportCSVButtonProps {
  applications: Application[];
}
export default function ExportCSVButton({
  applications,
}: ExportCSVButtonProps) {
  const exportCSV = () => {
    const headers = [
      "Company",
      "Role",
      "Status",
      "Location",
      "Salary",
      "Created At",
    ];

    const rows = applications.map((app) => [
      app.company,
      app.role,
      app.status,
      app.location || "",
      app.salary || "",
      new Date(app.createdAt).toLocaleDateString("en-GB"),
    ]);

    const csvContent = [headers, ...rows]
      .map((row) => row.map((cell) => `"${cell}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "applications.csv";
    link.click();

    window.URL.revokeObjectURL(url);
    toast.success("CSV exported successfully.");
  };

  return (
    <button
      onClick={exportCSV}
      className="rounded-2xl border border-indigo-100 bg-indigo-50 px-4 py-2.5 text-sm font-semibold text-indigo-700 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-200 hover:bg-indigo-100"
    >
      Export CSV
    </button>
  );
}
