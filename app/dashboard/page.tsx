
"use client"
import ApplicationList from "@/components/ApplicationList";
import FollowUpList from "@/components/dashboard/FollowUpList";
import DashboardStats from "@/components/DashboardStats";
import ApplicationForm from "@/components/forms/ApplicationForm";
import LogoutButton from "@/components/LogoutButton";
import RecentApplications from "@/components/RecentApplications";
import { Application } from "@/types/application";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("newest");

  const handleAddApplication = (newApp: Application) => {
    setApplications((prev) => [newApp, ...prev]);
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await fetch("/api/applications");

      const data = await response.json();
      setApplications(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  const deleteApplication = async (id: string) => {
    try {
      const response = await fetch(`/api/applications/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error();
      }

      fetchApplications();
    } catch (error) {
      console.error(error);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      const response = await fetch(`/api/application/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status,
        }),
      });

      if (!response.ok) {
        throw new Error();
      }

      fetchApplications();
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <LogoutButton/>
      </div>
      <DashboardStats applications={applications} />
      <ApplicationForm onAddSuccess={handleAddApplication} />

      <input
        type="text"
        placeholder="Search company or role..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border p-2 w-full rounded-lg"
      />

      <select value={statusFilter} onChange={(e)=>setStatusFilter(e.target.value)}className="border p-2 rounded">

        <option value="All">All</option>
        <option value="Applied">Applied</option>
        <option value="Interview">Interview</option>
        <option value="Offer">Offer</option>
        <option value="Rejected">Rejected</option>
      </select>

      <select>
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
      </select>

<p>Showing {" "}
  {
    filteredApplications.length
  }{" "}
  applications
</p>
      <ApplicationList
        applications={filteredApplications}
        onDelete={deleteApplication}
        onStatusChange={updateStatus}
      />

      <FollowUpList applications={applications}/>
      <RecentApplications applications={applications} />
    </div>
  );
}
