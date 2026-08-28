"use client";
import { CommunicationType, RecruiterCommunication } from "@/types/recruiterCommunication";
import { useEffect, useState } from "react";
import CommunicationCard from "./CommunicationCard";
import toast from "react-hot-toast";

interface Props {
  recruiterId: string;
}
export default function CommunicationList({ recruiterId }: Props) {
  const [communications, setCommunications] = useState<
    RecruiterCommunication[]
  >([]);

  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<
    "All" | RecruiterCommunication["type"]
  >("All");

  useEffect(() => {
    fetchCommunications();
  }, [recruiterId]);

  
  const fetchCommunications = async () => {
    try {
      const response = await fetch(
        `/api/recruiter-communications?recruiterId=${recruiterId}`,
      );

      console.log("response is:", response);

      if (!response.ok) {
        throw new Error("Failed to fetch communications");
      }

      const data = await response.json();
      console.log("Data in fetchCommunication is:", data);

      setCommunications(
        data.sort(
          (a: RecruiterCommunication, b: RecruiterCommunication) =>
            new Date(b.date).getTime() - new Date(a.date).getTime(),
        ),
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  

  if (loading) {
    return <p>Loading communications...</p>;
  }

  if (communications.length === 0) {
    return(
      <div className="mt-6 bg-white flex flex-col justify-center rounded-xl shadow-md p-6">

        <p className="text-red-500">No communications yet.</p>
      </div>
    )
  }

  const filteredCommunications = communications.filter((communication) => {
    const normalizedSearch = search.toLowerCase().replace(/\s+/g, "");

    const normalizedSubject = (communication.subject ?? "")
      .toLowerCase()
      .replace(/\s+/g, "");

    const normalizedMessage = (communication.message ?? "")
      .toLowerCase()
      .replace(/\s+/g, "");

    const matchesSearch =
      normalizedSubject.includes(normalizedSearch) ||
      normalizedMessage.includes(normalizedSearch);

    const matchesType =
      filterType === "All" || communication.type === filterType;

    return matchesSearch && matchesType;
  });
  return (
    <div className="mt-6 bg-white rounded-xl shadow-md p-6">
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6">
        <input
          type="text"
          placeholder="Search subject or message..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 pr-9 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 transition-all"
        />

        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value as "All" | CommunicationType)}
          className="pl-10 pr-9 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 transition-all"
        >
          <option value="All">All</option>

          <option value="Email">Email</option>

          <option value="Phone">Phone</option>

          <option value="Linkedin">LinkedIn</option>

          <option value="WhatsApp">WhatsApp</option>

          <option value="Meeting">Meeting</option>

          <option value="Other">Other</option>
        </select>
      </div>
      <h2 className="text-xl font-semibold mb-6">Communication Timeline</h2>

      {filteredCommunications.length === 0 ? (
        <p className="text-gray-500">No communications yet.</p>
      ) : (
        <div className="relative border-l-2 border-gray-300 ml-5 space-y-8">
          {filteredCommunications.map((communication) => (
            <div key={communication._id} className="relative ml-6">
              <div className="absolute -left-8.25 top-6 w-4 h-4 rounded-full bg-blue-600 border-4 border-white"/>
              <CommunicationCard
                communication={communication}
                onUpdated={fetchCommunications}
                onDelete={async () => {
                  try {
                    const response = await fetch(
                      `/api/recruiter-communications/${communication._id}`,
                      {
                        method: "DELETE",
                      },
                    );

                    if (!response.ok) {
                      throw new Error();
                    }

                    toast.success("Communication deleted");

                    fetchCommunications();
                  } catch (error) {
                    console.error(error);

                    toast.error("Delete failed");
                  }
                }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
