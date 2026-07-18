"use client"
import CompanyDetails from "@/components/company/CompanyDetails";
import { Recruiter } from "@/types/recruiter";
import { RecruiterCommunication } from "@/types/recruiterCommunication";
import { useParams } from "next/navigation"
import { useState } from "react";

export default function CompanyDetailsPage() {
    const params = useParams();
    const company = decodeURIComponent(params.company as string)

    const [loading,setLoading] = useState(true);
    const [recruiters, setRecruiters] = useState<Recruiter[]>([])
    const [communications, setCommunications] = useState<RecruiterCommunication[]>([]);

    async function fetchCompany(){
        try{
            const recruiterResponse = await fetch(`/api/company/${encodeURIComponent(company)}`)

            const communicationResponse = await fetch(`/api/company/${encodeURIComponent(company)}/communications`)

            const recruiterData = await recruiterResponse.json();
            const communicationData = await communicationResponse.json();

            setRecruiters(recruiterData)
            setCommunications(communicationData)
        }catch(error){
            console.error(error);
            
        }finally{
            setLoading(false);
        }
    }
  return (
    <CompanyDetails company={company} recruiters={recruiters} communications={communications}/>
  )
}
