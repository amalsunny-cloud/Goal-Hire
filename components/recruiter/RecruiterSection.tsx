"use client";

import { useEffect, useState } from "react";
import RecruiterForm from "./RecruiterForm";
import RecruiterCard from "./RecruiterCard";
import { Recruiter } from "@/types/recruiter";
import toast from "react-hot-toast";
import RecruiterAnalytics from "./RecruiterAnalytics";
import { RecruiterCommunication } from "@/types/recruiterCommunication";
import CommunicationMethodChart from "./CommunicationMethodChart";
import MonthlyCommunicationChart from "./MonthlyCommunicationChart";
import FollowUpStatusChart from "./FollowUpStatusChart";
import CommunicationTrendChart from "./CommunicationTrendChart";
import ResponseAnalytics from "./ResponseAnalytics";
import RecruiterActivityTimeline from "./RecruiterActivityTimeline";
import RecruiterCalendar from "./RecruiterCalendar";
import RecruiterReminderPanel from "./RecruiterReminderPanel";

interface Props {
  applicationId: string;
}

export default function RecruiterSection({ applicationId }: Props) {
  const [recruiters, setRecruiters] = useState<Recruiter[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All")
  const [communications, setCommunications] = useState<
  RecruiterCommunication[]
>([]);

  const fetchRecruiters = async () => {
    try {
      const response = await fetch(
        `/api/recruiters?applicationId=${applicationId}`,
      );

      if (!response.ok) {
        throw new Error("Failed to fetch recruiters");
      }

      console.log("response is:",response);
      const data = await response.json();
      setRecruiters(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecruiters();
    fetchCommunications();
  }, []);

  const filteredRecruiters = recruiters.filter((recruiter)=>{
    const searchMatch = recruiter.name?.toLowerCase().includes(search.toLowerCase()) || recruiter.email?.toLowerCase().includes(search.toLowerCase());

    if(!searchMatch){
      return false;
    }
    if(filter === "All"){
      return true;
    }

    if(!recruiter.nextFollowUp){
      return false;
    }

    const today = new Date();
    today.setHours(0,0,0,0);

    const followUp = new Date(recruiter.nextFollowUp);
    followUp.setHours(0,0,0,0);

    if(filter === "Upcoming"){
      return followUp > today;
    }
    if(filter === "Overdue"){
      return followUp < today;
    }

    return true;
  })



  const fetchCommunications = async () => {
  try {
    console.log("inside fetchCommunications try block");
    
    const response = await fetch(
      `/api/recruiter-communications?applicationId=${applicationId}`
    );

    console.log("Response of fetchCommunications:",response);
    
    if (!response.ok) {
      throw new Error("Failed to fetch communications");
    }

    const data = await response.json();
    console.log("Data in fetchCommunications:",data);
    

    setCommunications(data);
  } catch (error) {
    console.error(error);
  }
};
  return (
    <div className="space-y-6">
      <RecruiterForm
        applicationId={applicationId}
        onSuccess={()=>{
          fetchRecruiters();
          fetchCommunications();
        }}
      />

      <RecruiterAnalytics recruiters={recruiters} communications={communications}/>
      <RecruiterCalendar recruiters={recruiters}/>
      <RecruiterReminderPanel recruiters={recruiters}/>
      <ResponseAnalytics communications={communications}/>
      <CommunicationMethodChart communications={communications}/>
      <MonthlyCommunicationChart communications={communications}/>
      <FollowUpStatusChart recruiters={recruiters}/>
      <CommunicationTrendChart communications={communications}/>
      <RecruiterActivityTimeline recruiters={recruiters} communications={communications}/>
      <div>
        <h2
          className="
            text-2xl
            font-semibold
            mb-4
          "
        >
          Recruiters
        </h2>

      <div>
        <input type="text" placeholder="Search recruiter..."  value={search} onChange={(e)=>setSearch(e.target.value)} className="border p-2 rounded w-full"/>

        <label className="font-bold">Filter by :</label>
        <select value={filter} onChange={(e)=>setFilter(e.target.value)}>
          <option value="All">All</option>
          <option value="Upcoming">Upcoming</option>
          <option value="Today">Follow-up Today</option>
          <option value="Overdue">Overdue</option>
        </select>
      </div>
        {loading ? (
          <p>Loading...</p>
        ) : filteredRecruiters.length === 0 ? (
          <p>No recruiters added.</p>
        ) : (
          <div className="space-y-4">
            {filteredRecruiters.map((recruiter) => (
              <RecruiterCard
                key={recruiter._id}
                recruiter={recruiter}
                onDelete={async () => {
                  try {
                    const response = await fetch(
                      `/api/recruiters/${recruiter._id}`,
                      {
                        method: "DELETE",
                      }
                    );

                    if (!response.ok) {
                      throw new Error();
                    }
                    console.log("response is:", response);
                    console.log("Deleted Recruiter successfully");

                    toast.success("Deleted Recruiter successfully");

                    fetchRecruiters();

                  } catch (error) {
                    console.error(error);
                  }
                } } onUpdated={()=>{
                  fetchRecruiters();
                  fetchCommunications();
                }}/>
            ))}
          </div>
        )}
      </div>
    </div> 
  );
}
