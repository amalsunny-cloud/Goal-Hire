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
import ResponsePieChart from "./ResponsePieChart";
import RecruiterConversionFunnel from "./RecruiterConversionFunnel";
import RecruiterLeaderboard from "./RecruiterLeaderboard";
import RecruiterExport from "./RecruiterExport";

interface Props {
  applicationId: string;
}

export default function RecruiterSection({ applicationId }: Props) {
  const [recruiters, setRecruiters] = useState<Recruiter[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [tagFilter, setTagFilter] = useState("All");
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

      console.log("response is:", response);
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

  const allTags = [
    ...new Set(
      recruiters.flatMap(
        (recruiter) => recruiter.tags || []
      )
    ),
  ];

  const filteredRecruiters = recruiters.filter((recruiter) => {
    const searchMatch =
      recruiter.name
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      recruiter.email
        ?.toLowerCase()
        .includes(search.toLowerCase());

    if (!searchMatch) {
      return false;
    }

    if (
      tagFilter !== "All" &&
      !recruiter.tags?.includes(tagFilter)
    ) {
      return false;
    }

    if (filter !== "All") {
      if (!recruiter.nextFollowUp) {
        return false;
      }

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const followUp = new Date(recruiter.nextFollowUp);
      followUp.setHours(0, 0, 0, 0);

      if (filter === "Upcoming" && !(followUp > today)) {
        return false;
      }

      if (filter === "Today" && followUp.getTime() !== today.getTime()) {
        return false;
      }

      if (filter === "Overdue" && !(followUp < today)) {
        return false;
      }
    }

    return true;
  });

  const fetchCommunications = async () => {
    try {
      console.log("inside fetchCommunications try block");

      const response = await fetch(
        `/api/recruiter-communications?applicationId=${applicationId}`,
      );

      console.log("Response of fetchCommunications:", response);

      if (!response.ok) {
        throw new Error("Failed to fetch communications");
      }

      const data = await response.json();
      console.log("Data in fetchCommunications:", data);

      setCommunications(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="space-y-7">
      {/* Recruiter Form + Analytics */}
      <div className="grid grid-cols-1 gap-5 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 lg:grid-cols-2">
        <RecruiterForm
          applicationId={applicationId}
          onSuccess={() => {
            fetchRecruiters();
            fetchCommunications();
          }}
        />

        <RecruiterAnalytics
          recruiters={recruiters}
          communications={communications}
        />
      </div>

      {/* Recruiter Overview */}
      <div className="space-y-5">
        <RecruiterCalendar recruiters={recruiters} />

        <RecruiterReminderPanel recruiters={recruiters} />

        <ResponseAnalytics communications={communications} />
      </div>

      {/* Conversion Analytics */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <ResponsePieChart communications={communications} />

        <RecruiterConversionFunnel
          recruiters={recruiters}
          communications={communications}
        />
      </div>

      {/* Recruiter Leaderboard */}
      <RecruiterLeaderboard
        recruiters={recruiters}
        communications={communications}
      />

      {/* Export */}
      <RecruiterExport
        recruiters={recruiters}
        communications={communications}
      />

      {/* Communication Analytics */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <CommunicationMethodChart
          communications={communications}
        />

        <MonthlyCommunicationChart
          communications={communications}
        />
      </div>

      {/* Follow-up Analytics */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <FollowUpStatusChart recruiters={recruiters} />

        <CommunicationTrendChart
          communications={communications}
        />
      </div>

      {/* Activity Timeline */}
      <RecruiterActivityTimeline
        recruiters={recruiters}
        communications={communications}
      />

      {/* Recruiters */}
      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
              Recruiters
            </h2>

            <p className="mt-1 text-xs text-slate-500 sm:text-sm">
              Manage recruiters and track your follow-ups.
            </p>
          </div>

          {recruiters.length > 0 && (
            <div className="w-fit rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-600">
              {recruiters.length}{" "}
              {recruiters.length === 1 ? "Recruiter" : "Recruiters"}
            </div>
          )}
        </div>

        {recruiters.length > 0 && (
          <div className="mb-6 rounded-2xl border border-slate-200 bg-slate-50/60 p-3 sm:p-4">
            <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
              {/* Search */}
              <div className="md:col-span-1">
                <input
                  type="text"
                  placeholder="Search recruiter..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10"
                />
              </div>

              {/* Follow-up filter */}
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-full cursor-pointer appearance-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 outline-none transition-all duration-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10"
              >
                <option value="All">All Status</option>
                <option value="Upcoming">Upcoming</option>
                <option value="Today">Today</option>
                <option value="Overdue">Overdue</option>
              </select>

              {/* Tag filter */}
              <select
                value={tagFilter}
                onChange={(e) => setTagFilter(e.target.value)}
                className="w-full cursor-pointer appearance-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 outline-none transition-all duration-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10"
              >
                <option value="All">All Tags</option>

                {allTags.map((tag) => (
                  <option
                    key={tag}
                    value={tag}
                  >
                    {tag}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Recruiter List */}
        {loading ? (
          <div className="space-y-3">
            <div className="h-24 animate-pulse rounded-2xl bg-slate-100" />
            <div className="h-24 animate-pulse rounded-2xl bg-slate-100" />
          </div>
        ) : filteredRecruiters.length === 0 ? (
          <div className="flex min-h-36 items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/60 p-6 text-center">
            <div>
              <p className="text-sm font-semibold text-slate-700">
                No recruiters added
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Add a recruiter or adjust your search and filters.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredRecruiters.map((recruiter) => (
              <RecruiterCard
                key={recruiter._id}
                recruiter={recruiter}
                company={recruiter.company}
                onDelete={async () => {
                  try {
                    const response = await fetch(
                      `/api/recruiters/${recruiter._id}`,
                      {
                        method: "DELETE",
                      },
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
                }}
                onUpdated={() => {
                  fetchRecruiters();
                  fetchCommunications();
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}