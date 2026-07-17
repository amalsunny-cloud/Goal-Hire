"use client";

import { useEffect, useState } from "react";

import CompanyDashboard from "@/components/company/CompanyDashboard";

import { Recruiter } from "@/types/recruiter";
import { RecruiterCommunication } from "@/types/recruiterCommunication";

export default function CompanyDashboardPage() {
  const [loading, setLoading] = useState(true);

  const [recruiters, setRecruiters] =
    useState<Recruiter[]>([]);

  const [communications, setCommunications] =
    useState<RecruiterCommunication[]>([]);

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

      setRecruiters(recruiterData);

      setCommunications(
        communicationData
      );
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
        recruiters={recruiters}
        communications={
          communications
        }
      />
    </div>
  );
}