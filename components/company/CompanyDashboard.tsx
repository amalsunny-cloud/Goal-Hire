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
  const [rateFilter, setRateFilter] = useState<"all" | "high" | "moderate" | "low">("all");
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
      const application = applicationMap.get(recruiter.applicationId?.toString());
      const companyName = application?.company?.trim() || recruiter.company?.trim();

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
      const recruiter = recruiterMap.get(communication.recruiterId?.toString());
      if (!recruiter) return;

      const application = applicationMap.get(recruiter.applicationId?.toString());
      const companyName = application?.company?.trim() || recruiter.company?.trim();

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
      result = result.filter((c) => c.responseRate >= 70 && c.communicationCount > 0);
    } else if (rateFilter === "moderate") {
      result = result.filter((c) => c.responseRate >= 40 && c.responseRate < 70);
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

  const hasActiveFilters = search !== "" || rateFilter !== "all" || sortBy !== "communications";

  return (
    <div className="space-y-6">
      {/* Navigation Tabs Bar */}
      <div className="overflow-x-auto rounded-2xl border border-slate-200/80 bg-white/90 p-1.5 shadow-sm shadow-slate-200/50 scrollbar-none">
        <div className="flex min-w-max items-center gap-1">
        <button
          onClick={() => setActiveTab("overview")}
          className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer select-none whitespace-nowrap ${
            activeTab === "overview"
              ? "bg-slate-900 text-white shadow-md shadow-slate-300"
              : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
          }`}
        >
          <LayoutGrid className="w-3.5 h-3.5" />
          <span>Dashboard Overview</span>
        </button>

        <button
          onClick={() => setActiveTab("directory")}
          className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer select-none whitespace-nowrap ${
            activeTab === "directory"
              ? "bg-slate-900 text-white shadow-md shadow-slate-300"
              : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
          }`}
        >
          <Building2 className="w-3.5 h-3.5" />
          <span>Company Directory ({rawCompanies.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("analytics")}
          className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer select-none whitespace-nowrap ${
            activeTab === "analytics"
              ? "bg-slate-900 text-white shadow-md shadow-slate-300"
              : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
          }`}
        >
          <BarChart3 className="w-3.5 h-3.5" />
          <span>Analytics & Comparisons</span>
        </button>

        <button
          onClick={() => setActiveTab("leaderboard")}
          className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer select-none whitespace-nowrap ${
            activeTab === "leaderboard"
              ? "bg-slate-900 text-white shadow-md shadow-slate-300"
              : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
          }`}
        >
          <Trophy className="w-3.5 h-3.5" />
          <span>Leaderboard</span>
        </button>
        </div>
      </div>

      {/* Global Analytics Overview (Displayed in overview and analytics tab) */}
      {(activeTab === "overview" || activeTab === "analytics") && (
        <CompanyAnalytics companies={rawCompanies} />
      )}

      {/* Bar Chart & Leaderboard Row */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <CompanyBarChart companies={rawCompanies} />
          </div>
          <div>
            <CompanyLeaderboard companies={rawCompanies} />
          </div>
        </div>
      )}

      {activeTab === "analytics" && (
        <div className="space-y-6">
          <CompanyBarChart companies={rawCompanies} />
        </div>
      )}

      {activeTab === "leaderboard" && (
        <div className="max-w-4xl mx-auto">
          <CompanyLeaderboard companies={rawCompanies} />
        </div>
      )}

      {/* Company Directory Section */}
      {(activeTab === "overview" || activeTab === "directory") && (
        <div className="space-y-6 pt-2">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                <span>Target Companies Directory</span>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                  {filteredCompanies.length} of {rawCompanies.length}
                </span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Explore individual company communication logs, recruiter contacts, and response metrics
              </p>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl self-start md:self-auto border border-slate-200/60">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  viewMode === "grid"
                    ? "bg-white text-slate-900 shadow-2xs"
                    : "text-slate-500 hover:text-slate-800"
                }`}
                title="Grid view"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Grid</span>
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  viewMode === "list"
                    ? "bg-white text-slate-900 shadow-2xs"
                    : "text-slate-500 hover:text-slate-800"
                }`}
                title="List view"
              >
                <List className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">List</span>
              </button>
            </div>
          </div>

          {/* Search, Filter & Sort Control Panel */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 shadow-xs space-y-4">
            <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
              {/* Search Box */}
              <div className="relative flex-1 w-full">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search by company name..."
                  aria-label="Search companies"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-9 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 transition-all"
                />
                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Sort Selector */}
              <div className="flex items-center gap-2.5 w-full md:w-auto">
                <div className="relative w-full md:w-auto">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                    <ArrowUpDown className="w-3.5 h-3.5" />
                  </div>
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
                    className="w-full md:w-auto pl-8.5 pr-8 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 transition-all cursor-pointer appearance-none"
                  >
                    <option value="communications">Sort: Most Outreach</option>
                    <option value="responses">Sort: Highest Response %</option>
                    <option value="recruiters">Sort: Most Recruiters</option>
                    <option value="alphabetical">Sort: Alphabetical (A-Z)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Quick Health Filter Chips */}
            <div className="flex items-center justify-between flex-wrap gap-2 pt-1 border-t border-slate-100">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-xs font-semibold text-slate-500 mr-1 flex items-center gap-1">
                  <Filter className="w-3 h-3" />
                  <span>Filter:</span>
                </span>
                <button
                  onClick={() => setRateFilter("all")}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    rateFilter === "all"
                      ? "bg-slate-800 text-white shadow-2xs"
                      : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/60"
                  }`}
                >
                  All ({rawCompanies.length})
                </button>
                <button
                  onClick={() => setRateFilter("high")}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    rateFilter === "high"
                      ? "bg-emerald-600 text-white shadow-2xs"
                      : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200"
                  }`}
                >
                  High Response ≥70%
                </button>
                <button
                  onClick={() => setRateFilter("moderate")}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    rateFilter === "moderate"
                      ? "bg-amber-600 text-white shadow-2xs"
                      : "bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200"
                  }`}
                >
                  Moderate (40-69%)
                </button>
                <button
                  onClick={() => setRateFilter("low")}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    rateFilter === "low"
                      ? "bg-rose-600 text-white shadow-2xs"
                      : "bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200"
                  }`}
                >
                  Needs Outreach (&lt;40%)
                </button>
              </div>

              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="text-xs font-semibold text-rose-600 hover:text-rose-700 hover:underline cursor-pointer flex items-center gap-1"
                >
                  <X className="w-3 h-3" />
                  <span>Reset Filters</span>
                </button>
              )}
            </div>
          </div>

          {/* Company Cards Grid or List */}
          {filteredCompanies.length === 0 ? (
            <div className="bg-white border border-slate-200/80 rounded-2xl p-12 text-center shadow-xs space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto border border-slate-200/60 shadow-2xs">
                <Building2 className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-slate-800">
                  No matching companies found
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  {search
                    ? `No organizations match "${search}". Try checking your spelling or adjusting your response filters.`
                    : "No companies match the selected filter criteria."}
                </p>
              </div>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold rounded-xl shadow-xs transition-all cursor-pointer inline-flex items-center gap-2"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Clear Search & Filters</span>
                </button>
              )}
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredCompanies.map((company) => (
                <CompanyCard key={company.company} company={company} />
              ))}
            </div>
          ) : (
            /* List / Table Mode */
            <div className="bg-white border border-slate-200/80 rounded-2xl shadow-xs overflow-hidden divide-y divide-slate-100">
              {filteredCompanies.map((company) => (
                <Link
                  key={company.company}
                  href={`/dashboard/company/${encodeURIComponent(company.company)}`}
                  className="group block p-4 sm:p-5 hover:bg-slate-50/80 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-slate-100 to-slate-200/80 border border-slate-200 text-slate-800 font-extrabold text-sm flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                        {company.company.slice(0, 2).toUpperCase()}
                      </div>
                      <div className="min-w-0 truncate">
                        <h4 className="font-bold text-sm text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                          {company.company}
                        </h4>
                        <span className="text-xs text-slate-400">
                          {company.lastContact
                            ? `Last contact: ${new Date(company.lastContact).toLocaleDateString("en-GB")}`
                            : "No contacts logged"}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-6">
                      <div className="flex items-center gap-4 text-xs text-slate-600">
                        <div className="text-center">
                          <span className="font-bold text-slate-900 block">
                            {company.recruiterCount}
                          </span>
                          <span className="text-[10px] text-slate-400 uppercase font-semibold">
                            Recruiters
                          </span>
                        </div>
                        <div className="text-center">
                          <span className="font-bold text-slate-900 block">
                            {company.communicationCount}
                          </span>
                          <span className="text-[10px] text-slate-400 uppercase font-semibold">
                            Outreach
                          </span>
                        </div>
                        <div className="text-center">
                          <span className="font-bold text-slate-900 block">
                            {company.responseCount}
                          </span>
                          <span className="text-[10px] text-slate-400 uppercase font-semibold">
                            Responses
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span
                          className={`px-2.5 py-1 rounded-full text-xs font-bold border ${
                            company.responseRate >= 70
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                              : company.responseRate >= 40
                              ? "bg-amber-50 text-amber-700 border-amber-200"
                              : "bg-slate-100 text-slate-600 border-slate-200"
                          }`}
                        >
                          {company.responseRate}%
                        </span>

                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
