import ApplicationList from "@/components/ApplicationList";
import ApplicationForm from "@/components/forms/ApplicationForm";
import { Application } from "@/types/application";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <ApplicationForm />
      <ApplicationList applications={applications} />
    </div>
  );
}
