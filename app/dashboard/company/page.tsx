"use client";

import { useEffect, useState } from "react";

import CompanyDashboard from "@/components/company/CompanyDashboard";

import { Recruiter } from "@/types/recruiter";
import { RecruiterCommunication } from "@/types/recruiterCommunication";
import { Application } from "@/types/application";

export default function CompanyDashboardPage() {
  const [loading, setLoading] = useState(true);

  const [recruiters, setRecruiters] = useState<Recruiter[]>([]);
  const [error, setError] = useState("");

  const [communications, setCommunications] = useState<
    RecruiterCommunication[]
  >([]);

  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      // const recruiterResponse = await fetch(
      //   "/api/company-dashboard/recruiters"
      // );

      // const communicationResponse = await fetch(
      //     "/api/company-dashboard/communications"
      //   );

      // const applicationResponse = await fetch("/api/applications");

      const [recruiterResponse, communicationResponse, applicationResponse] =
        await Promise.all([
          fetch("/api/company-dashboard/recruiters"),
          fetch("/api/company-dashboard/communications"),
          fetch("/api/applications"),
        ]);

      if (
        !recruiterResponse.ok ||
        !communicationResponse.ok ||
        !applicationResponse.ok
      ) {
        throw new Error("Failed to load company dashboard.");
      }

      // const recruiterData = await recruiterResponse.json();

      // const communicationData = await communicationResponse.json();

      // const applicationData = await applicationResponse.json();

      const [recruiterData, communicationData, applicationData] =
        await Promise.all([
          recruiterResponse.json(),
          communicationResponse.json(),
          applicationResponse.json(),
        ]);

      setRecruiters(recruiterData);
      setCommunications(communicationData);
      setApplications(applicationData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (error) {
    return <p>Failed to load dashboard.</p>;
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <p className="p-8">Loading company dashboard...</p>
      </div>
    );
  }

  return (
    <div className="p-8 bg-white">
      <h1 className="text-3xl font-bold mb-8">
        Company Dashboard
      </h1>

      <CompanyDashboard
        applications={applications}
        recruiters={recruiters}
        communications={communications}
      />
    </div>
  );
}
