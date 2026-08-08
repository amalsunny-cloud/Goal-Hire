"use client";
import ApplicationList from "@/components/ApplicationList";
import AnalyticsSection from "@/components/dashboard/AnalyticsSection";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import FollowUpList from "@/components/dashboard/FollowUpList";
import RecentActivity from "@/components/dashboard/RecentActivity";
import UpcomingInterviews from "@/components/dashboard/UpcomingInterviews";
import DashboardStats from "@/components/DashboardStats";
import ApplicationForm from "@/components/forms/ApplicationForm";
import LogoutButton from "@/components/LogoutButton";
import RecentApplications from "@/components/RecentApplications";
import { Application } from "@/types/application";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import ApplicationsChart from "@/components/dashboard/ApplicationsChart";
import { getApplicationsPerMonth } from "@/lib/dashboard/getApplicationsPerMonth";
import { getFunnelData } from "@/lib/dashboard/getFunnelData";
import ApplicationFunnel from "@/components/dashboard/ApplicationFunnel";
import InterviewAnalytics from "@/components/dashboard/InterviewAnalytics";
import ExportCSVButton from "@/components/dashboard/ExportCSVButton";
import ReminderWidget from "@/components/dashboard/ReminderWidget";
import { Interview } from "@/types/interview";
import KanbanBoard from "@/components/dashboard/KanbanBoard";
import ApplicationAnalytics from "@/components/dashboard/ApplicationAnalytics";
import CompanyInsights from "@/components/dashboard/CompanyInsights";
import ApplicationCalendar from "@/components/dashboard/ApplicationCalendar";
import SourceAnalytics from "@/components/dashboard/SourceAnalytics";
import SourceSuccessAnalytics from "@/components/dashboard/SourceSuccessAnalytics";
import GoalTracker from "@/components/dashboard/GoalTracker";
import { Goal } from "@/types/goal";
import GoalSettings from "@/components/dashboard/GoalSettings";
import StreakTracker from "@/components/dashboard/StreakTracker";
import PredictionAnalytics from "@/components/dashboard/PredictionAnalytics";
import Link from "next/link";

export default function Dashboard() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<
    "overview" | "analytics" | "workflow" | "applications"
  >("overview");

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("newest");

  const [upcomingInterviews, setUpcomingInterviews] = useState([]);
  const [interviews, setInterviews] = useState<Interview[]>([]);

  const [goal, setGoal] = useState<Goal | null>(null);

  // throw new Error("Testing error Page...")
  const handleAddApplication = (newApp: Application) => {
    setApplications((prev) => [newApp, ...prev]);
  };

  const fetchInterviews = async () => {
    try {
      const response = await fetch("/api/interviews/all");

      if (!response.ok) {
        throw new Error("Failed to fetch interviews");
      }
      const data = await response.json();
      console.log("Interview API Data:", data);

      setInterviews(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUpcomingInterviews = async () => {
    try {
      const response = await fetch("/api/interviews/upcoming");
      if (!response.ok) {
        throw new Error("Failed to fetch upcoming interviews");
      }

      const data = await response.json();

      setUpcomingInterviews(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchGoal = async () => {
    const response = await fetch("/api/goals");

    if (!response.ok) {
      throw new Error("Failed to fetch goals");
    }
    const data = await response.json();

    setGoal(data);
  };

  const fetchApplications = async () => {
    try {
      console.log("Fetching applications...");

      const response = await fetch("/api/applications");
      console.log("Response:", response.status);

      const data = await response.json();
      console.log("Data:", data);

      setApplications(data);
    } catch (error) {
      console.error("FETCH ERROR:", error);
    }
  };

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);

        await Promise.all([
          fetchApplications(),
          fetchUpcomingInterviews(),
          fetchInterviews(),
          fetchGoal(),
        ]);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    };
    loadDashboard();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  const deleteApplication = async (id: string) => {
    try {
      const response = await fetch(`/api/applications/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        toast.error("Failed to delete the application");
        throw new Error();
      }

      toast.success("Application deleted");
      await fetchApplications();
    } catch (error) {
      console.error(error);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      const response = await fetch(`/api/applications/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status,
        }),
      });

      if (!response.ok) {
        toast.error("Failed to update status");
        throw new Error();
      }

      toast.success("Status updated");

      setTimeout(() => {
        fetchApplications();
      }, 1000);
    } catch (error) {
      console.error(error);
    }
  };

  const filteredApplications = applications
    .filter((app) => {
      const searchMatch =
        app.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.role.toLowerCase().includes(searchTerm.toLowerCase());

      const statusMatch = statusFilter === "All" || app.status === statusFilter;

      return searchMatch && statusMatch;
    })
    .sort((a, b) => {
      if (sortBy === "newest") {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      }

      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    });

  const applicationCount = applications.length;
  const offerCount = applications.filter(
    (app) => app.status === "Offer",
  ).length;

  console.log("applications in 141:", applications);
  const interviewCount = upcomingInterviews.length;

  const chartData = getApplicationsPerMonth(applications);
  const funnelData = getFunnelData(applications);

  return (
    <div className="min-h-screen bg-white text-slate-800 p-4 sm:p-8 space-y-8">
      {/* Top Navigation & Action Header */}
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 bg-slate-400/10 p-6 rounded-2xl backdrop-blur-md">
        <DashboardHeader
          applicationCount={applicationCount}
          interviewCount={interviewCount}
          offerCount={offerCount}
          applications={applications}
        />

        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto justify-end">
          <Link
            href="/dashboard/company"
            className="px-4 py-2.5 text-white bg-slate-600 hover:bg-blue-500 rounded-xl transition-all shadow-md shadow-blue-600/20"
          >
            Company Insights
          </Link>
          <ExportCSVButton applications={applications} />
          <LogoutButton />
        </div>
      </header>

      {/* Main KPI Stats Row */}
      <DashboardStats applications={applications} />

      {/* Tab Controls Bar */}
      <div className="flex border-b border-slate-800/20 space-x-2 sm:space-x-6 overflow-x-auto pb-1 bg-slate-300/60">
        {[
          { id: "overview", label: "Overview & Streak" },
          { id: "analytics", label: "Analytics & Insights" },
          { id: "workflow", label: "Kanban & Calendar" },
          { id: "applications", label: "Manage Applications" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`py-2.5 px-4 text-xs sm:text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === tab.id
                ? "border-slate-500/30 text-slate-500"
                : "border-transparent text-slate-400 hover:text-slate-800/70"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === "overview" && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <StreakTracker applications={applications} />
              <ApplicationsChart data={chartData} />
              <RecentApplications applications={applications} />
            </div>
            <div className="space-y-6">
              <ReminderWidget
                applications={applications}
                interviews={interviews}
              />
              <UpcomingInterviews interviews={upcomingInterviews} />
              <RecentActivity applications={applications} />
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ANALYTICS & GOALS */}
      {activeTab === "analytics" && (
        <div className="space-y-8">
          <AnalyticsSection applications={applications} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ApplicationFunnel data={funnelData} />
            <PredictionAnalytics applications={applications} />
          </div>

          {goal && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <GoalTracker applications={applications} goal={goal} />
              </div>
              <div>
                <GoalSettings goal={goal} onGoalUpdated={setGoal} />
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SourceAnalytics applications={applications} />
            <SourceSuccessAnalytics applications={applications} />
          </div>

          <CompanyInsights applications={applications} />
          <InterviewAnalytics interviews={interviews} />
          <ApplicationAnalytics applications={applications} />
        </div>
      )}

      {/* TAB 3: WORKFLOW, KANBAN & CALENDAR */}
      {activeTab === "workflow" && (
        <div className="space-y-8">
          <KanbanBoard
            applications={applications}
            onRefresh={fetchApplications}
          />
          <ApplicationCalendar
            applications={applications}
            interviews={interviews}
          />
          <FollowUpList applications={applications} />
        </div>
      )}

      {/* TAB 4: APPLICATIONS MANAGEMENT */}
      {activeTab === "applications" && (
        <div className="space-y-8">
          {/* Add New Application Form Container */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
            <h2 className="text-lg font-bold text-white mb-4">
              Add New Application
            </h2>
            <ApplicationForm onAddSuccess={handleAddApplication} />
          </div>

          {/* Filter, Search & Sorting Panel */}
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <input
                type="text"
                placeholder="Search by company or role..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full md:w-1/2 px-4 py-2.5 bg-slate-800/60 border border-slate-700/60 rounded-xl text-slate-100 placeholder-slate-500 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <div className="flex w-full md:w-auto items-center gap-3">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full md:w-auto px-3.5 py-2.5 bg-slate-800/60 border border-slate-700/60 rounded-xl text-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="All">All Statuses</option>
                  <option value="Applied">Applied</option>
                  <option value="Interview">Interview</option>
                  <option value="Offer">Offer</option>
                  <option value="Rejected">Rejected</option>
                </select>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full md:w-auto px-3.5 py-2.5 bg-slate-800/60 border border-slate-700/60 rounded-xl text-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="newest">Sort: Newest</option>
                  <option value="oldest">Sort: Oldest</option>
                </select>
              </div>
            </div>

            <p className="text-xs text-slate-400 pt-1">
              Showing{" "}
              <span className="text-slate-200 font-semibold">
                {filteredApplications.length}
              </span>{" "}
              of {applications.length} applications
            </p>
          </div>

          {/* Application Data Table / List */}
          <ApplicationList
            applications={filteredApplications}
            onDelete={deleteApplication}
            onStatusChange={updateStatus}
          />

          <ApplicationForm onAddSuccess={handleAddApplication} />

          <FollowUpList applications={applications} />

          <UpcomingInterviews interviews={upcomingInterviews} />
          <RecentActivity applications={applications} />
          <RecentApplications applications={applications} />
        </div>
      )}
    </div>
  );
}
