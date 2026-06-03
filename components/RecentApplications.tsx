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
  return (
    <div className="bg-white border rounded-lg p-5">
      <h2 className="font-bold text-lg mb-4">Recent Applications</h2>

      {recent.map((app) => (
        <div key={app._id} className="py-2 border-b">
          {app.company}
        </div>
      ))}
    </div>
  );
}
