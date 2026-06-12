import { Application } from "@/types/application";

interface Props {
  applications: Application[];
}
export default function RecentApplications({ applications }: Props) {
  const recent = [...applications]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, 5);


    if(recent.length===0){
    return (
      <div className="border rounded-lg py-3">
              <h2 className="font-bold text-lg mb-2">Recent Applications</h2>

        <p className="text-red-500 font-semibold">No recent applications</p>
      </div>
    )
  }
  return (
    <div className="bg-white border rounded-lg p-5">
      <h2 className="font-bold text-lg mb-4 text-gray-600">Recent Applications</h2>

      {recent.map((app) => (
        <div key={app._id} className="py-2 border-b text-gray-600">
          {app.company}
        </div>
      ))}
    </div>
  );

  
}
