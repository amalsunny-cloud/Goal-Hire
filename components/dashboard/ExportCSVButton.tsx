"use client";

import { Application } from "@/types/application";

interface Props {
  applications: Application[];
}
export default function ExportCSVButton({ applications }: Props) {
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
  };

  return (
    <button
      onClick={exportCSV}
      className="bg-green-600 text-white px-4 py-2 rounded"
    >
      Export CSV
    </button>
  );
}
