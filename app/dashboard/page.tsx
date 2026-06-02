import ApplicationList from "@/components/ApplicationList";
import DashboardStats from "@/components/DashboardStats";
import ApplicationForm from "@/components/forms/ApplicationForm";
import { Application } from "@/types/application";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  const handleAddApplication =(newApp: Application)=>{
    setApplications((prev)=>[newApp,...prev])
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


  const deleteApplication = async(id:string)=>{
    try{
      const response = await fetch(`/api/applications/${id}`,
        {
          method: "DELETE",
        }
      );

      if(!response.ok){
        throw new Error();
      }

      fetchApplications();
    }catch(error){
      console.error(error);
      
    }
  }


  const updateStatus = async(id:string, status: string)=>{
    try{
      const response = await fetch(`/api/application/${id}`,{
        method: "PATCH",
        headers:{
          "Content-Type":"application/json",
        },
        body: JSON.stringify({
          status,
        }),
      })

      if(!response.ok){
        throw new Error();
      }

      fetchApplications();
    }catch(error){
      console.error(error);
      
    }
  }
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <DashboardStats applications={applications}/>
      <ApplicationForm onAddSuccess={handleAddApplication}/>
      <ApplicationList applications={applications} onDelete={deleteApplication} onStatusChange={updateStatus}/>
    </div>
  );
}
