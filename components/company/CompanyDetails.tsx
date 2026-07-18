"use client"

import { Recruiter } from "@/types/recruiter";
import { RecruiterCommunication } from "@/types/recruiterCommunication";
import CompanyRecruiterList from "./CompanyRecruiterList";
import CompanyStats from "./CompanyStats";

interface Props{
    company: string;
    recruiters:Recruiter[];
    communications:RecruiterCommunication[];
}
export default function CompanyDetails({company,recruiters,communications}:Props) {
  return (
    <div className="space-y-8 p-8">
      <h1 className="text-3xl font-bold"></h1>

      <CompanyStats recruiters={recruiters} communications={communications}/>
      <CompanyRecruiterList recruiters={recruiters}/>
    </div>
  )
}
