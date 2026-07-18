"use client";

import { useEffect, useState } from "react";

import CompanyDashboard from "@/components/company/CompanyDashboard";

import { Recruiter } from "@/types/recruiter";
import { RecruiterCommunication } from "@/types/recruiterCommunication";
import { Application } from "@/types/application";

export default function CompanyDashboardPage() {
  const [loading, setLoading] = useState(true);

  const [recruiters, setRecruiters] =
    useState<Recruiter[]>([]);

  const [communications, setCommunications] =
    useState<RecruiterCommunication[]>([]);

  const [applications, setApplications] =
    useState<Application[]>([]);


  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const recruiterResponse = await fetch(
        "/api/company-dashboard/recruiters"
      );

      const communicationResponse =
        await fetch(
          "/api/company-dashboard/communications"
        );

      const applicationResponse =
    await fetch("/api/applications");

      if (
        !recruiterResponse.ok ||
        !communicationResponse.ok
      ) {
        throw new Error();
      }

      const recruiterData =
        await recruiterResponse.json();

      const communicationData =
        await communicationResponse.json();

      const applicationData =
    await applicationResponse.json();

      setRecruiters(recruiterData);

      setCommunications(
        communicationData
      );

      setApplications(applicationData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <p className="p-8">
        Loading...
      </p>
    );
  }

  return (
    <div className="p-8">
      <h1
        className="
          text-3xl
          font-bold
          mb-8
        "
      >
        Company Dashboard
      </h1>

      <CompanyDashboard
        applications={applications}
        recruiters={recruiters}
        communications={
          communications
        }
      />
    </div>
  );
}