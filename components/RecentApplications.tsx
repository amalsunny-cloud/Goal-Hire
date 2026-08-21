import { Application } from "@/types/application";
import { useMemo } from "react";

interface RecentApplicationsProps {
  applications: Application[];
}
export default function RecentApplications({ applications }: RecentApplicationsProps) {

  const recent = useMemo(() => {
    return [...applications]
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() -
          new Date(a.createdAt).getTime()
      )
      .slice(0, 5);
  }, [applications]);


    if(recent.length===0){
    return (
      <div className="border rounded-lg py-3">
        <h2 className="font-bold text-lg mb-2">Recent Applications</h2>
        <p className="text-red-500 font-semibold">No recent applications yet.</p>
      </div>
    )
  }
  return (
    <div className="rounded-lg p-5">
      <h2 className="font-bold text-lg mb-4 text-gray-600">Recent Applications</h2>

      {recent.map((app) => (
        <div key={app._id} className="py-2 border-b last:border-b-0 border-gray-500/30 text-gray-600">
          {app.company}
        </div>
      ))}
    </div>
  );

  
}
