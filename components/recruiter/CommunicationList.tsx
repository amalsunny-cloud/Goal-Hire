"use client";

import {
  CommunicationType,
  RecruiterCommunication,
} from "@/types/recruiterCommunication";
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
    return (
      <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center gap-3">
          <div className="h-10 w-10 animate-pulse rounded-xl bg-slate-100" />

          <div className="space-y-2">
            <div className="h-5 w-44 animate-pulse rounded-md bg-slate-100" />
            <div className="h-3 w-32 animate-pulse rounded-md bg-slate-100" />
          </div>
        </div>

        <div className="space-y-4">
          <div className="h-20 animate-pulse rounded-2xl bg-slate-50" />
          <div className="h-20 animate-pulse rounded-2xl bg-slate-50" />
        </div>
      </div>
    );
  }

  if (communications.length === 0) {
    return (
      <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-6 flex items-start gap-3 border-b border-slate-100 pb-5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-600">
            <span className="text-lg">💬</span>
          </div>

          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
              Communication Timeline
            </h2>

            <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
              Track your communication history with this recruiter.
            </p>
          </div>
        </div>

        <div className="flex min-h-40 items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/60 px-6">
          <div className="text-center">
            <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-lg">
              💬
            </div>

            <p className="text-sm font-semibold text-slate-700">
              No communications yet
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Your recruiter communication history will appear here.
            </p>
          </div>
        </div>
      </div>
    );
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
    <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 border-b border-slate-100 pb-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-600">
            <span className="text-lg">💬</span>
          </div>

          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
              Communication Timeline
            </h2>

            <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
              Search and review your recruiter communication history.
            </p>
          </div>
        </div>

        <div className="w-fit rounded-xl border border-indigo-100 bg-indigo-50 px-3 py-2 text-xs font-semibold text-indigo-600">
          {filteredCommunications.length}{" "}
          {filteredCommunications.length === 1
            ? "Communication"
            : "Communications"}
        </div>
      </div>

      {/* Filters */}
      <div className="mb-7 rounded-2xl border border-slate-200 bg-slate-50/60 p-3 sm:p-4">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_auto]">
          <input
            type="text"
            placeholder="Search subject or message..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-all duration-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10"
          />

          <select
            value={filterType}
            onChange={(e) =>
              setFilterType(
                e.target.value as
                  | "All"
                  | CommunicationType,
              )
            }
            className="w-full cursor-pointer appearance-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 outline-none transition-all duration-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10 sm:w-40"
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
      </div>

      {/* Timeline */}
      {filteredCommunications.length === 0 ? (
        <div className="flex min-h-40 items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/60 px-6">
          <div className="text-center">
            <p className="text-sm font-semibold text-slate-700">
              No matching communications
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Try changing your search or communication type.
            </p>
          </div>
        </div>
      ) : (
        <div className="relative ml-3 border-l-2 border-slate-100 pl-7 sm:ml-5 sm:pl-8">
          {filteredCommunications.map((communication) => (
            <div
              key={communication._id}
              className="relative mb-7 last:mb-0"
            >
              {/* Timeline Dot */}
              <div className="absolute left-[-2.45rem] top-6 flex h-4 w-4 items-center justify-center rounded-full border-4 border-white bg-blue-600 shadow-sm sm:left-[-2.7rem]">
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
              </div>

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