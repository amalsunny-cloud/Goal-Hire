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
import { Application, ApplicationStatus } from "@/types/application";
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
import {
  BarChart3,
  Building2,
  ClipboardList,
  LayoutDashboard,
  Sparkles,
  Workflow,
} from "lucide-react";

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

  const handleAddApplication = (newApp: Application) => {
    setApplications((prev) => [newApp, ...prev]);
  };

  const fetchInterviews = async () => {
    try {
      const response = await fetch("/api/interviews/all");
      if (!response.ok) throw new Error("Failed to fetch interviews");
      const data = await response.json();
      setInterviews(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUpcomingInterviews = async () => {
    try {
      const response = await fetch("/api/interviews/upcoming");
      if (!response.ok) throw new Error("Failed to fetch upcoming interviews");
      const data = await response.json();
      setUpcomingInterviews(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchGoal = async () => {
    const response = await fetch("/api/goals");
    if (!response.ok) return;
    const data = await response.json();
    setGoal(data);
  };

  const fetchApplications = async () => {
    try {
      const response = await fetch("/api/applications");
      const data = await response.json();
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
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="w-full max-w-sm space-y-4">
          <div className="h-8 bg-slate-200 rounded-lg animate-pulse w-3/4 mx-auto" />
          <div className="h-64 bg-slate-200 rounded-2xl animate-pulse" />
        </div>
      </div>
    );
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

  const updateStatus = async (
    id: string,
    status: ApplicationStatus,
  ): Promise<boolean> => {
    const currentApplication = applications.find((a) => a._id === id);
    if (!currentApplication) return false;
    const previousStatus = currentApplication.status;
    setApplications((prev) =>
      prev.map((a) => (a._id === id ? { ...a, status } : a)),
    );
    try {
      const response = await fetch(`/api/applications/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!response.ok) throw new Error("Failed to update status");
      toast.success("Status updated");
      return true;
    } catch (error) {
      setApplications((prev) =>
        prev.map((a) => (a._id === id ? { ...a, status: previousStatus } : a)),
      );
      toast.error("Failed to update status");
      return false;
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
    .sort((a, b) =>
      sortBy === "newest"
        ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        : new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    );

  const applicationCount = applications.length;
  const offerCount = applications.filter(
    (app) => app.status === "Offer",
  ).length;
  const interviewCount = upcomingInterviews.length;
  const chartData = getApplicationsPerMonth(applications);
  const funnelData = getFunnelData(applications);
  
  const panelClassName =
    "rounded-2xl bg-slate-400/10 p-5 shadow-sm shadow-slate-200/30 transition-shadow hover:shadow-md sm:p-6";
  const tabs = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "workflow", label: "Workflow", icon: Workflow },
    { id: "applications", label: "Applications", icon: ClipboardList },
  ] as const;

  return (
    <div className="min-h-screen px-4 py-6 text-slate-800 sm:px-6 sm:py-8 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="relative overflow-hidden rounded-4xl bg-gray-500 p-6 text-white shadow-2xl shadow-blue-950/20 sm:p-8 lg:p-10">
          <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-blue-100/20 blur-3xl" />
          <div className="absolute -bottom-32 left-1/4 h-72 w-72 rounded-full bg-indigo-100/15 blur-3xl" />
          <div className="relative flex flex-col items-start justify-between gap-7 lg:flex-row lg:items-center">
            <DashboardHeader
              applicationCount={applicationCount}
              interviewCount={interviewCount}
              offerCount={offerCount}
              applications={applications}
            />
            <div className="flex flex-wrap items-center gap-2.5">
              <Link
                href="/dashboard/company"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-slate-900 shadow-lg shadow-blue-950/20 transition hover:-translate-y-0.5 hover:bg-blue-50"
              >
                <Building2 className="h-4 w-4 text-blue-600" />
                Company Insights
              </Link>
              <ExportCSVButton applications={applications} />
              <LogoutButton />
            </div>
          </div>
        </header>

        <DashboardStats applications={applications} />

        <div className="overflow-x-auto w-[50%] mx-auto rounded-2xl border border-slate-200/80 bg-white p-1.5 shadow-sm shadow-slate-200/30">
          <div className="flex justify-center min-w-max gap-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all sm:px-5 ${activeTab === tab.id ? "bg-slate-900 text-white shadow-md shadow-slate-300" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"}`}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <div className={panelClassName}>
                <StreakTracker applications={applications} />
              </div>
              <div className={panelClassName}>
                <ApplicationsChart data={chartData} />
              </div>
              <div className={panelClassName}>
                <RecentApplications applications={applications} />
              </div>
            </div>
            <div className="space-y-4">
              <div className={panelClassName}>
                <ReminderWidget
                  applications={applications}
                  interviews={interviews}
                />
              </div>
              <div className={panelClassName}>
                <UpcomingInterviews interviews={upcomingInterviews} />
              </div>
              <div className={panelClassName}>
                <RecentActivity applications={applications} />
              </div>
            </div>
          </div>
        )}

        {activeTab === "analytics" && (
          <div className="space-y-4">
            <div className={panelClassName}>
              <AnalyticsSection applications={applications} />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className={panelClassName}>
                <ApplicationFunnel data={funnelData} />
              </div>
              <div className={panelClassName}>
                <PredictionAnalytics applications={applications} />
              </div>
            </div>
            {goal && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className={`lg:col-span-2 ${panelClassName}`}>
                  <GoalTracker applications={applications} goal={goal} />
                </div>
                <div className={panelClassName}>
                  <GoalSettings goal={goal} onGoalUpdated={setGoal} />
                </div>
              </div>
            )}
            <div className={panelClassName}>
              <SourceAnalytics applications={applications} />
            </div>
            <div className={panelClassName}>
              <SourceSuccessAnalytics applications={applications} />
            </div>
            <div className={panelClassName}>
              <CompanyInsights applications={applications} />
            </div>
            <div className={panelClassName}>
              <InterviewAnalytics interviews={interviews} />
            </div>
            <div className={panelClassName}>
              <ApplicationAnalytics applications={applications} />
            </div>
          </div>
        )}

        {activeTab === "workflow" && (
          <div className="space-y-4">
            <div className={panelClassName}>
              <KanbanBoard
                applications={applications}
                onStatusChange={updateStatus}
              />
            </div>
            <div className={panelClassName}>
              <ApplicationCalendar
                applications={applications}
                interviews={interviews}
              />
            </div>
            <div className={panelClassName}>
              <FollowUpList applications={applications} />
            </div>
          </div>
        )}

        {activeTab === "applications" && (
          <div className="space-y-4">
            <div className="mx-auto max-w-4xl rounded-2xl border border-slate-200/80 bg-slate-400/10 p-6 shadow-sm shadow-slate-200/30 sm:p-8">
              <div className="mb-6 flex justify-center items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-lg font-bold text-slate-900">
                    Add New Application
                  </p>
                  <p className="text-sm text-slate-500">
                    Keep your job search moving forward.
                  </p>
                </div>
              </div>
              <ApplicationForm onAddSuccess={handleAddApplication} />
            </div>
            <div className={panelClassName}>
              <div className="flex flex-wrap gap-4 items-center justify-between mb-6">
                <input
                  type="text"
                  placeholder="Search applications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-9 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 transition-all md:w-72"
                />
                <div className="flex gap-2">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="rounded-xl pl-10 pr-9 py-2.5 bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 transition-all"
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
                    className="pl-10 pr-9 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 transition-all"
                  >
                    <option value="newest">Newest</option>
                    <option value="oldest">Oldest</option>
                  </select>
                </div>
              </div>
              <ApplicationList
                applications={filteredApplications}
                onDelete={deleteApplication}
                onStatusChange={updateStatus}
              />
            </div>
            <div className={panelClassName}>
              <FollowUpList applications={applications} />
            </div>
            <div className={panelClassName}>
              <UpcomingInterviews interviews={upcomingInterviews} />
            </div>
            <div className={panelClassName}>
              <RecentActivity applications={applications} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
