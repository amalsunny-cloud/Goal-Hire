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

export default function Dashboard() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

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

      const data = await response.json();

      setUpcomingInterviews(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchGoal = async () => {
    const response = await fetch("/api/goals");

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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
    fetchUpcomingInterviews();
    fetchInterviews();
    fetchGoal();
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

      setTimeout(() => {
        fetchApplications();
      }, 1000);
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
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <DashboardHeader
          applicationCount={applicationCount}
          interviewCount={interviewCount}
          offerCount={offerCount}
          applications={applications}
        />

        <div className="flex justify-end">
          <ExportCSVButton applications={applications} />
          <LogoutButton />
        </div>
      </div>
      <DashboardStats applications={applications} />
      <AnalyticsSection applications={applications} />
      <ApplicationsChart data={chartData} />
      <ApplicationFunnel data={funnelData} />
      <ApplicationAnalytics applications={applications} />

      <PredictionAnalytics applications={applications}/>

      {goal && (
        <>
          <GoalTracker applications={applications} goal={goal} />

          <GoalSettings goal={goal} onGoalUpdated={setGoal} />
        </>
      )}

      <StreakTracker applications={applications}/>

      <CompanyInsights applications={applications} />
      <SourceAnalytics applications={applications} />
      <SourceSuccessAnalytics applications={applications} />
      <KanbanBoard applications={applications} onRefresh={fetchApplications} />
      <InterviewAnalytics interviews={interviews} />
      <ReminderWidget applications={applications} interviews={interviews} />

      <ApplicationCalendar
        applications={applications}
        interviews={interviews}
      />

      <input
        type="text"
        placeholder="Search company or role..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border p-2 w-[75%] rounded-lg"
      />
      <br />

      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        className="border p-2 rounded"
      >
        <option value="All">All</option>
        <option value="Applied">Applied</option>
        <option value="Interview">Interview</option>
        <option value="Offer">Offer</option>
        <option value="Rejected">Rejected</option>
      </select>

      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
      </select>

      <p>Showing {filteredApplications.length} applications</p>
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
  );
}
