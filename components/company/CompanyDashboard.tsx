"use client";

import { useMemo, useState } from "react";
import { Recruiter } from "@/types/recruiter";
import { RecruiterCommunication } from "@/types/recruiterCommunication";
import { CompanyInsight } from "@/types/companyInsight";
import CompanyAnalytics from "./CompanyAnalytics";
import CompanyCard from "./CompanyCard";
import CompanyBarChart from "./CompanyBarChart";
import CompanyLeaderboard from "./CompanyLeaderboard";
import { Application } from "@/types/application";
import {
  Search,
  X,
  ArrowUpDown,
  LayoutGrid,
  List,
  Building2,
  Users,
  Mail,
  TrendingUp,
  BarChart3,
  Trophy,
  Filter,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

interface CompanyDashboardProps {
  applications: Application[];
  recruiters: Recruiter[];
  communications: RecruiterCommunication[];
}

export default function CompanyDashboard({
  applications,
  recruiters,
  communications,
}: CompanyDashboardProps) {
  const [activeTab, setActiveTab] = useState<
    "overview" | "directory" | "analytics" | "leaderboard"
  >("overview");
  const [search, setSearch] = useState("");
  const [rateFilter, setRateFilter] = useState<
    "all" | "high" | "moderate" | "low"
  >("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<
    "communications" | "responses" | "recruiters" | "alphabetical"
  >("communications");

  // Aggregate company data
  const rawCompanies = useMemo(() => {
    const applicationMap = new Map(
      applications.map((application) => [
        application._id.toString(),
        application,
      ]),
    );

    const recruiterMap = new Map(
      recruiters.map((recruiter) => [recruiter._id.toString(), recruiter]),
    );

    const map = new Map<string, CompanyInsight>();

    // Register all companies from applications
    applications.forEach((application) => {
      const companyName = application.company.trim();
      if (!companyName) return;

      if (!map.has(companyName)) {
        map.set(companyName, {
          company: companyName,
          recruiterCount: 0,
          communicationCount: 0,
          responseCount: 0,
          responseRate: 0,
          lastContact: undefined,
          recruiters: [],
        });
      }
    });

    // Count recruiters per company
    recruiters.forEach((recruiter) => {
      const application = applicationMap.get(
        recruiter.applicationId?.toString(),
      );
      const companyName =
        application?.company?.trim() || recruiter.company?.trim();

      if (!companyName) return;

      if (!map.has(companyName)) {
        map.set(companyName, {
          company: companyName,
          recruiterCount: 0,
          communicationCount: 0,
          responseCount: 0,
          responseRate: 0,
          lastContact: undefined,
          recruiters: [],
        });
      }

      const item = map.get(companyName)!;
      item.recruiterCount++;
      item.recruiters.push(recruiter._id);

      if (
        recruiter.lastContact &&
        (!item.lastContact ||
          new Date(recruiter.lastContact) > new Date(item.lastContact))
      ) {
        item.lastContact = recruiter.lastContact;
      }
    });

    // Count communications and responses
    communications.forEach((communication) => {
      const recruiter = recruiterMap.get(
        communication.recruiterId?.toString(),
      );
      if (!recruiter) return;

      const application = applicationMap.get(
        recruiter.applicationId?.toString(),
      );
      const companyName =
        application?.company?.trim() || recruiter.company?.trim();

      if (!companyName) return;
      const item = map.get(companyName);
      if (!item) return;

      item.communicationCount++;
      if (communication.responded) {
        item.responseCount++;
      }
    });

    // Compute response rate
    map.forEach((company) => {
      company.responseRate =
        company.communicationCount === 0
          ? 0
          : Math.round(
              (company.responseCount / company.communicationCount) * 100,
            );
    });

    return [...map.values()];
  }, [applications, recruiters, communications]);

  // Filter & sort companies
  const filteredCompanies = useMemo(() => {
    let result = rawCompanies.filter((company) =>
      company.company.toLowerCase().includes(search.trim().toLowerCase()),
    );

    // Filter by response health
    if (rateFilter === "high") {
      result = result.filter(
        (c) => c.responseRate >= 70 && c.communicationCount > 0,
      );
    } else if (rateFilter === "moderate") {
      result = result.filter(
        (c) => c.responseRate >= 40 && c.responseRate < 70,
      );
    } else if (rateFilter === "low") {
      result = result.filter((c) => c.responseRate < 40);
    }

    // Sort companies
    const sorted = [...result];
    switch (sortBy) {
      case "alphabetical":
        sorted.sort((a, b) => a.company.localeCompare(b.company));
        break;
      case "recruiters":
        sorted.sort((a, b) => b.recruiterCount - a.recruiterCount);
        break;
      case "communications":
        sorted.sort((a, b) => b.communicationCount - a.communicationCount);
        break;
      case "responses":
        sorted.sort((a, b) => b.responseRate - a.responseRate);
        break;
    }

    return sorted;
  }, [rawCompanies, search, rateFilter, sortBy]);

  const clearFilters = () => {
    setSearch("");
    setRateFilter("all");
    setSortBy("communications");
  };

  const hasActiveFilters =
    search !== "" || rateFilter !== "all" || sortBy !== "communications";

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
      {/* Navigation Tabs */}
      <div className="w-full overflow-x-auto rounded-2xl border border-slate-200 bg-white p-1.5 shadow-sm scrollbar-none">
        <div className="flex min-w-max items-center gap-1">
          <button
            onClick={() => setActiveTab("overview")}
            className={`inline-flex cursor-pointer select-none items-center gap-2 whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200 ${
              activeTab === "overview"
                ? "bg-slate-900 text-white shadow-sm"
                : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            <LayoutGrid className="h-3.5 w-3.5" />
            <span>Dashboard Overview</span>
          </button>

          <button
            onClick={() => setActiveTab("directory")}
            className={`inline-flex cursor-pointer select-none items-center gap-2 whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200 ${
              activeTab === "directory"
                ? "bg-slate-900 text-white shadow-sm"
                : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            <Building2 className="h-3.5 w-3.5" />
            <span>Company Directory ({rawCompanies.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("analytics")}
            className={`inline-flex cursor-pointer select-none items-center gap-2 whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200 ${
              activeTab === "analytics"
                ? "bg-slate-900 text-white shadow-sm"
                : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            <BarChart3 className="h-3.5 w-3.5" />
            <span>Analytics & Comparisons</span>
          </button>

          <button
            onClick={() => setActiveTab("leaderboard")}
            className={`inline-flex cursor-pointer select-none items-center gap-2 whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200 ${
              activeTab === "leaderboard"
                ? "bg-slate-900 text-white shadow-sm"
                : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            <Trophy className="h-3.5 w-3.5" />
            <span>Leaderboard</span>
          </button>
        </div>
      </div>

      {/* Global Analytics Overview */}
      {(activeTab === "overview" || activeTab === "analytics") && (
        <CompanyAnalytics companies={rawCompanies} />
      )}

      {/* Bar Chart & Leaderboard Row */}
      {activeTab === "overview" && (
        <div className="grid w-full grid-cols-1 gap-6">
          <div className="w-full">
            <CompanyLeaderboard companies={rawCompanies} />
          </div>

          <div className="w-full">
            <CompanyBarChart companies={rawCompanies} />
          </div>
        </div>
      )}

      {/* Analytics */}
      {activeTab === "analytics" && (
        <div className="space-y-6">
          <CompanyBarChart companies={rawCompanies} />
        </div>
      )}

      {/* Leaderboard */}
      {activeTab === "leaderboard" && (
        <div className="mx-auto w-full max-w-5xl">
          <CompanyLeaderboard companies={rawCompanies} />
        </div>
      )}

      {/* Company Directory */}
      {(activeTab === "overview" || activeTab === "directory") && (
        <div className="space-y-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 lg:p-7">
          {/* Section Header */}
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-600">
                  <Building2 className="h-5 w-5" />
                </div>

                <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                  Target Companies Directory
                </h2>

                <span className="rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-600">
                  {filteredCompanies.length} of {rawCompanies.length}
                </span>
              </div>

              <p className="mt-2 max-w-2xl text-xs leading-5 text-slate-500 sm:text-sm">
                Explore individual company communication logs, recruiter
                contacts, and response metrics.
              </p>
            </div>

            {/* View Mode Toggle */}
            <div className="flex w-fit items-center gap-1 rounded-xl border border-slate-200 bg-slate-50 p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`flex cursor-pointer items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition-all duration-200 ${
                  viewMode === "grid"
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-500 hover:text-slate-800"
                }`}
                title="Grid view"
              >
                <LayoutGrid className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Grid</span>
              </button>

              <button
                onClick={() => setViewMode("list")}
                className={`flex cursor-pointer items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition-all duration-200 ${
                  viewMode === "list"
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-500 hover:text-slate-800"
                }`}
                title="List view"
              >
                <List className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">List</span>
              </button>
            </div>
          </div>

          {/* Search, Filter & Sort Control Panel */}
          <div className="space-y-4 rounded-2xl border border-slate-200 bg-slate-50/60 p-3 sm:p-4">
            <div className="flex flex-col items-center justify-between gap-3 md:flex-row">
              {/* Search */}
              <div className="relative w-full flex-1">
                <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <input
                  type="text"
                  placeholder="Search by company name..."
                  aria-label="Search companies"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-10 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-all duration-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10"
                />

                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer rounded-lg p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>

              {/* Sort */}
              <div className="relative w-full md:w-auto">
                <ArrowUpDown className="pointer-events-none absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />

                <select
                  value={sortBy}
                  onChange={(e) =>
                    setSortBy(
                      e.target.value as
                        | "alphabetical"
                        | "recruiters"
                        | "communications"
                        | "responses",
                    )
                  }
                  className="w-full cursor-pointer appearance-none rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-9 text-sm font-medium text-slate-700 outline-none transition-all duration-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10 md:w-64"
                >
                  <option value="communications">
                    Sort: Most Outreach
                  </option>
                  <option value="responses">
                    Sort: Highest Response %
                  </option>
                  <option value="recruiters">
                    Sort: Most Recruiters
                  </option>
                  <option value="alphabetical">
                    Sort: Alphabetical (A-Z)
                  </option>
                </select>
              </div>
            </div>

            {/* Quick Health Filter Chips */}
            <div className="flex flex-col gap-3 border-t border-slate-200/70 pt-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap items-center gap-2">
                <span className="mr-1 flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                  <Filter className="h-3 w-3" />
                  Filter:
                </span>

                <button
                  onClick={() => setRateFilter("all")}
                  className={`cursor-pointer rounded-xl px-3 py-2 text-xs font-semibold transition-all duration-200 ${
                    rateFilter === "all"
                      ? "bg-slate-900 text-white shadow-sm"
                      : "border border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  All ({rawCompanies.length})
                </button>

                <button
                  onClick={() => setRateFilter("high")}
                  className={`cursor-pointer rounded-xl px-3 py-2 text-xs font-semibold transition-all duration-200 ${
                    rateFilter === "high"
                      ? "bg-emerald-600 text-white shadow-sm"
                      : "border border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                  }`}
                >
                  High Response ≥70%
                </button>

                <button
                  onClick={() => setRateFilter("moderate")}
                  className={`cursor-pointer rounded-xl px-3 py-2 text-xs font-semibold transition-all duration-200 ${
                    rateFilter === "moderate"
                      ? "bg-amber-600 text-white shadow-sm"
                      : "border border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100"
                  }`}
                >
                  Moderate (40-69%)
                </button>

                <button
                  onClick={() => setRateFilter("low")}
                  className={`cursor-pointer rounded-xl px-3 py-2 text-xs font-semibold transition-all duration-200 ${
                    rateFilter === "low"
                      ? "bg-rose-600 text-white shadow-sm"
                      : "border border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100"
                  }`}
                >
                  Needs Outreach (&lt;40%)
                </button>
              </div>

              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="inline-flex cursor-pointer items-center gap-1.5 text-xs font-semibold text-rose-600 transition-colors hover:text-rose-700"
                >
                  <X className="h-3 w-3" />
                  Reset Filters
                </button>
              )}
            </div>
          </div>

          {/* Company Cards Grid or List */}
          {filteredCompanies.length === 0 ? (
            <div className="flex min-h-64 flex-col items-center justify-center rounded-3xl border border-dashed border-slate-200 bg-slate-50/60 p-10 text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-400 shadow-sm">
                <Building2 className="h-7 w-7" />
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-800">
                  No matching companies found
                </h3>

                <p className="mx-auto mt-1 max-w-sm text-xs leading-5 text-slate-500">
                  {search
                    ? `No organizations match "${search}". Try checking your spelling or adjusting your response filters.`
                    : "No companies match the selected filter criteria."}
                </p>
              </div>

              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="mt-5 inline-flex cursor-pointer items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-800"
                >
                  <X className="h-3.5 w-3.5" />
                  <span>Clear Search & Filters</span>
                </button>
              )}
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
              {filteredCompanies.map((company) => (
                <CompanyCard key={company.company} company={company} />
              ))}
            </div>
          ) : (
            /* List / Table Mode */
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="divide-y divide-slate-100">
                {filteredCompanies.map((company) => (
                  <Link
                    key={company.company}
                    href={`/dashboard/company/${encodeURIComponent(
                      company.company,
                    )}`}
                    className="group block p-4 transition-colors duration-200 hover:bg-slate-50 sm:p-5"
                  >
                    <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                      {/* Company */}
                      <div className="flex min-w-0 items-center gap-3.5">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-slate-100 text-sm font-extrabold text-slate-800 transition-transform duration-200 group-hover:scale-105">
                          {company.company.slice(0, 2).toUpperCase()}
                        </div>

                        <div className="min-w-0">
                          <h4 className="truncate text-sm font-bold text-slate-900 transition-colors group-hover:text-blue-600">
                            {company.company}
                          </h4>

                          <span className="text-xs text-slate-400">
                            {company.lastContact
                              ? `Last contact: ${new Date(
                                  company.lastContact,
                                ).toLocaleDateString("en-GB")}`
                              : "No contacts logged"}
                          </span>
                        </div>
                      </div>

                      {/* Metrics */}
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-end">
                        <div className="grid grid-cols-3 gap-4 text-center">
                          <div>
                            <span className="block text-sm font-bold text-slate-900">
                              {company.recruiterCount}
                            </span>

                            <span className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                              Recruiters
                            </span>
                          </div>

                          <div>
                            <span className="block text-sm font-bold text-slate-900">
                              {company.communicationCount}
                            </span>

                            <span className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                              Outreach
                            </span>
                          </div>

                          <div>
                            <span className="block text-sm font-bold text-slate-900">
                              {company.responseCount}
                            </span>

                            <span className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                              Responses
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between gap-3 sm:justify-end">
                          <span
                            className={`rounded-xl border px-3 py-1.5 text-xs font-bold ${
                              company.responseRate >= 70
                                ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                                : company.responseRate >= 40
                                  ? "border-amber-200 bg-amber-50 text-amber-700"
                                  : "border-slate-200 bg-slate-100 text-slate-600"
                            }`}
                          >
                            {company.responseRate}%
                          </span>

                          <ArrowRight className="h-4 w-4 text-slate-400 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-blue-600" />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}