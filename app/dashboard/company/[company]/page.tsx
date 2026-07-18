"use client"
import CompanyDetails from "@/components/company/CompanyDetails";
import { Application } from "@/types/application";
import { Recruiter } from "@/types/recruiter";
import { RecruiterCommunication } from "@/types/recruiterCommunication";
import { useParams } from "next/navigation"
import { useEffect, useState } from "react";

export default function CompanyDetailsPage() {
    const params = useParams();
    const company = decodeURIComponent(params.company as string)

    const [loading,setLoading] = useState(true);
    const [recruiters, setRecruiters] = useState<Recruiter[]>([])
    const [communications, setCommunications] = useState<RecruiterCommunication[]>([]);


    useEffect(() => {
  if (company) {
    fetchCompany();
  }
}, [company]);


   async function fetchCompany() {
  try {
    const [
      applicationResponse,
      recruiterResponse,
      communicationResponse,
    ] = await Promise.all([
      fetch("/api/applications"),
      fetch("/api/company-dashboard/recruiters"),
      fetch("/api/company-dashboard/communications"),
    ]);

    if (
      !applicationResponse.ok ||
      !recruiterResponse.ok ||
      !communicationResponse.ok
    ) {
      throw new Error("Failed to fetch company data");
    }

    const applicationData: Application[] =
      await applicationResponse.json();

    const recruiterData: Recruiter[] =
      await recruiterResponse.json();

    const communicationData: RecruiterCommunication[] =
      await communicationResponse.json();

    // All applications belonging to this company
    const companyApplications = applicationData.filter(
      (application) => application.company === company
    );

    if (companyApplications.length === 0) {
      setRecruiters([]);
      setCommunications([]);
      return;
    }

    const applicationIds = new Set(
      companyApplications.map((application) =>
        application._id.toString()
      )
    );

    const companyRecruiters = recruiterData.filter(
      (recruiter) =>
        applicationIds.has(recruiter.applicationId.toString())
    );

    const recruiterIds = new Set(
      companyRecruiters.map((recruiter) =>
        recruiter._id.toString()
      )
    );

    const companyCommunications =
      communicationData.filter((communication) =>
        recruiterIds.has(
          communication.recruiterId.toString()
        )
      );

    setRecruiters(companyRecruiters);
    setCommunications(companyCommunications);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
}


if (loading) {
  return (
    <div className="p-8">
      Loading company...
    </div>
  );
}


  return (
    <CompanyDetails company={company} recruiters={recruiters} communications={communications}/>
  )
}
