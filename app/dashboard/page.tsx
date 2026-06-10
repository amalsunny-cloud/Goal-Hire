"use client";
import ApplicationList from "@/components/ApplicationList";
import FollowUpList from "@/components/dashboard/FollowUpList";
import UpcomingInterviews from "@/components/dashboard/UpcomingInterviews";
import DashboardStats from "@/components/DashboardStats";
import ApplicationForm from "@/components/forms/ApplicationForm";
import LogoutButton from "@/components/LogoutButton";
import RecentApplications from "@/components/RecentApplications";
import { Application } from "@/types/application";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Dashboard() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("newest");

  const [upcomingInterviews, setUpcomingInterviews] = useState([]);

  const handleAddApplication = (newApp: Application) => {
    setApplications((prev) => [newApp, ...prev]);
  };

 
   const fetchUpcomingInterviews = async() => {
    try {
      const response = await fetch("/api/interviews/upcoming");

      const data = await response.json();

      setUpcomingInterviews(data);
    } catch (error) {
      console.error(error);
    }
  };


  const fetchApplications = async () => {
    try {
      console.log(
      "Fetching applications..."
    );

      const response = await fetch("/api/applications");
 console.log(
      "Response:",
      response.status
    );

      const data = await response.json();
      console.log(
      "Data:",
      data
    );


      setApplications(data);
    } catch (error) {
console.error(
      "FETCH ERROR:",
      error
    );
    } finally {
      setLoading(false);
    }
  };

     useEffect(() => {
    fetchApplications();
    fetchUpcomingInterviews();
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
        toast.error("Failed to delete the application")
        throw new Error();
      }

      toast.success("Application deleted")

      setTimeout(()=>{
        fetchApplications();
      },1000)

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
        toast.error("Failed to update status")
        throw new Error();
      }

      toast.success("Status updated");
      
      setTimeout(()=>{
        fetchApplications();
      },1000)


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

        <LogoutButton />
      </div>
      <DashboardStats applications={applications} />

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

      <UpcomingInterviews interviews={upcomingInterviews}/>
      <RecentApplications applications={applications} />
    </div>
  );
}
