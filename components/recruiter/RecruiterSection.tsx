"use client";

import { useEffect, useState } from "react";
import RecruiterForm from "./RecruiterForm";
import RecruiterCard from "./RecruiterCard";
import { Recruiter } from "@/types/recruiter";

interface Props {
  applicationId: string;
}

export default function RecruiterSection({ applicationId }: Props) {
  const [recruiters, setRecruiters] = useState<Recruiter[]>([]);

  const [loading, setLoading] = useState(true);

  const fetchRecruiters = async () => {
    try {
      const response = await fetch(
        `/api/recruiters?applicationId=${applicationId}`,
      );

      if (!response.ok) {
        throw new Error("Failed to fetch recruiters");
      }

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
  }, []);

  return (
    <div className="space-y-6">
      <RecruiterForm
        applicationId={applicationId}
        onSuccess={fetchRecruiters}
      />

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

        {loading ? (
          <p>Loading...</p>
        ) : recruiters.length === 0 ? (
          <p>No recruiters added.</p>
        ) : (
          <div className="space-y-4">
            {recruiters.map((recruiter) => (
              <RecruiterCard key={recruiter._id} recruiter={recruiter} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
