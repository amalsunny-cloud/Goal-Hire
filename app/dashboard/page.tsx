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
import {
  Application,
  ApplicationStatus,
} from "@/types/application";
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
      const response = await fetch(`/api/applications/${id}`, { method: "DELETE" });
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

  const updateStatus = async (id: string, status: ApplicationStatus): Promise<boolean> => {
    const currentApplication = applications.find((a) => a._id === id);
    if (!currentApplication) return false;
    const previousStatus = currentApplication.status;
    setApplications((prev) => prev.map((a) => (a._id === id ? { ...a, status } : a)));
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
      setApplications((prev) => prev.map((a) => (a._id === id ? { ...a, status: previousStatus } : a)));
      toast.error("Failed to update status");
      return false;
    }
  };

  const filteredApplications = applications
    .filter((app) => {
      const searchMatch = app.company.toLowerCase().includes(searchTerm.toLowerCase()) || app.role.toLowerCase().includes(searchTerm.toLowerCase());
      const statusMatch = statusFilter === "All" || app.status === statusFilter;
      return searchMatch && statusMatch;
    })
    .sort((a, b) => (sortBy === "newest" ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime() : new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()));

  const applicationCount = applications.length;
  const offerCount = applications.filter((app) => app.status === "Offer").length;
  const interviewCount = upcomingInterviews.length;
  const chartData = getApplicationsPerMonth(applications);
  const funnelData = getFunnelData(applications);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 p-4 md:p-8 space-y-8">
      <header className="relative bg-white border border-slate-200 p-8 rounded-3xl shadow-sm overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-100 to-transparent opacity-50" />
        <div className="relative flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <DashboardHeader applicationCount={applicationCount} interviewCount={interviewCount} offerCount={offerCount} applications={applications} />
          <div className="flex items-center gap-3">
            <Link href="/dashboard/company" className="px-5 py-2.5 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 transition-all shadow-lg shadow-slate-200">Company Insights</Link>
            <ExportCSVButton applications={applications} />
            <LogoutButton />
          </div>
        </div>
      </header>

      <DashboardStats applications={applications} />

      <div className="flex bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm w-fit mx-auto">
        {[
          { id: "overview", label: "Overview" },
          { id: "analytics", label: "Analytics" },
          { id: "workflow", label: "Workflow" },
          { id: "applications", label: "Applications" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${activeTab === tab.id ? "bg-slate-900 text-white shadow-md" : "text-slate-500 hover:bg-slate-100"}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm"><StreakTracker applications={applications} /></div>
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm"><ApplicationsChart data={chartData} /></div>
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm"><RecentApplications applications={applications} /></div>
          </div>
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm"><ReminderWidget applications={applications} interviews={interviews} /></div>
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm"><UpcomingInterviews interviews={upcomingInterviews} /></div>
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm"><RecentActivity applications={applications} /></div>
          </div>
        </div>
      )}

      {activeTab === "analytics" && (
        <div className="space-y-8">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm"><AnalyticsSection applications={applications} /></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm"><ApplicationFunnel data={funnelData} /></div>
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm"><PredictionAnalytics applications={applications} /></div>
          </div>
          {goal && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm"><GoalTracker applications={applications} goal={goal} /></div>
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm"><GoalSettings goal={goal} onGoalUpdated={setGoal} /></div>
            </div>
          )}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm"><SourceAnalytics applications={applications} /></div>
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm"><SourceSuccessAnalytics applications={applications} /></div>
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm"><CompanyInsights applications={applications} /></div>
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm"><InterviewAnalytics interviews={interviews} /></div>
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm"><ApplicationAnalytics applications={applications} /></div>
        </div>
      )}

      {activeTab === "workflow" && (
        <div className="space-y-8">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm"><KanbanBoard applications={applications} onStatusChange={updateStatus} /></div>
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm"><ApplicationCalendar applications={applications} interviews={interviews} /></div>
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm"><FollowUpList applications={applications} /></div>
        </div>
      )}

      {activeTab === "applications" && (
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm max-w-4xl mx-auto">
            <h2 className="text-xl font-bold mb-6">Add New Application</h2>
            <ApplicationForm onAddSuccess={handleAddApplication} />
          </div>
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <div className="flex flex-wrap gap-4 items-center justify-between mb-6">
              <input type="text" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="bg-slate-50 px-4 py-2 rounded-xl border border-slate-200 w-full md:w-64" />
              <div className="flex gap-2">
                <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="bg-slate-50 px-4 py-2 rounded-xl border border-slate-200">
                  <option value="All">All Statuses</option>
                  <option value="Applied">Applied</option>
                  <option value="Interview">Interview</option>
                  <option value="Offer">Offer</option>
                  <option value="Rejected">Rejected</option>
                </select>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="bg-slate-50 px-4 py-2 rounded-xl border border-slate-200">
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                </select>
              </div>
            </div>
            <ApplicationList applications={filteredApplications} onDelete={deleteApplication} onStatusChange={updateStatus} />
          </div>
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm"><FollowUpList applications={applications} /></div>
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm"><UpcomingInterviews interviews={upcomingInterviews} /></div>
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm"><RecentActivity applications={applications} /></div>
        </div>
      )}
    </div>
  );
}
