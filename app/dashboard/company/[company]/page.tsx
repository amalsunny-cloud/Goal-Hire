"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import CompanyDetails from "@/components/company/CompanyDetails";
import { Application } from "@/types/application";
import { Recruiter } from "@/types/recruiter";
import { RecruiterCommunication } from "@/types/recruiterCommunication";
import { Loader2, AlertCircle } from "lucide-react";

export default function CompanyDetailsPage() {
  const params = useParams();
  const company = decodeURIComponent(params.company as string);

  const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState<Application[]>([]);
  const [recruiters, setRecruiters] = useState<Recruiter[]>([]);
  const [communications, setCommunications] = useState<
    RecruiterCommunication[]
  >([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (company) {
      fetchCompany();
    }
  }, [company]);

  async function fetchCompany() {
    try {
      setLoading(true);
      setError("");

      const [applicationResponse, recruiterResponse, communicationResponse] =
        await Promise.all([
          fetch("/api/applications"),
          fetch("/api/company-dashboard/recruiters"),
          fetch("/api/company-dashboard/communications"),
        ]);

      if (
        !applicationResponse.ok ||
        !recruiterResponse.ok ||
        !communicationResponse.ok
      ) {
        throw new Error("Failed to load company data. Please try again.");
      }

      const applicationData: Application[] = await applicationResponse.json();
      const recruiterData: Recruiter[] = await recruiterResponse.json();
      const communicationData: RecruiterCommunication[] =
        await communicationResponse.json();

      // All applications belonging to this company
      const companyApplications = applicationData.filter(
        (app) => app.company.trim().toLowerCase() === company.trim().toLowerCase(),
      );

      setApplications(companyApplications);

      if (companyApplications.length === 0) {
        setRecruiters([]);
        setCommunications([]);
        return;
      }

      const applicationIds = new Set(
        companyApplications.map((app) => app._id.toString()),
      );

      const companyRecruiters = recruiterData.filter((recruiter) =>
        applicationIds.has(recruiter.applicationId.toString()),
      );

      const recruiterIds = new Set(
        companyRecruiters.map((recruiter) => recruiter._id.toString()),
      );

      const companyCommunications = communicationData.filter((communication) =>
        recruiterIds.has(communication.recruiterId.toString()),
      );

      setRecruiters(companyRecruiters);
      setCommunications(companyCommunications);
    } catch (err: any) {
      console.error("Error fetching company details:", err);
      setError(err?.message || "Failed to load company data");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4">
        <div className="bg-white border border-slate-200/80 rounded-2xl p-8 text-center max-w-sm w-full shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto text-slate-700 shadow-2xs">
            <Loader2 className="w-6 h-6 animate-spin" />
          </div>
          <h3 className="text-base font-bold text-slate-800">
            Loading Company Profile
          </h3>
          <p className="text-xs text-slate-500">
            Gathering recruiters, communications, and application analytics for {company}...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4">
        <div className="bg-white border border-rose-200 rounded-2xl p-8 text-center max-w-md w-full shadow-xs space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 flex items-center justify-center mx-auto text-rose-600">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Unable to load company details
            </h3>
            <p className="text-xs text-rose-600 mt-1">{error}</p>
          </div>
          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={fetchCompany}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold rounded-xl shadow-xs transition-all cursor-pointer"
            >
              Try Again
            </button>
            <Link
              href="/dashboard/company"
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-all"
            >
              Back to Companies
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 p-4 sm:p-8 max-w-7xl mx-auto space-y-6">
      <CompanyDetails
        company={company}
        recruiters={recruiters}
        communications={communications}
        applications={applications}
      />
    </div>
  );
}

