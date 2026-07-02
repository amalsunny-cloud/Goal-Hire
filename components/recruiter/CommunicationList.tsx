"use client";
import { RecruiterCommunication } from "@/types/recruiterCommunication";
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

      setCommunications(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCommunications();
  }, []);

  if (loading) {
    return <p>Loading communications...</p>;
  }

  if (communications.length === 0) {
    return <p className="text-gray-500">No communications yet.</p>;
  }
  return (
    <div className="space-y-4">
      {communications.map((communication) => (
        <CommunicationCard
          key={communication._id}
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
      ))}
    </div>
  );
}
