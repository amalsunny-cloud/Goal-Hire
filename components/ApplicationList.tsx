import { Application } from "@/types/application"

interface Props{
    applications: Application[];
}

export default function ApplicationList({applications}:Props) {
  return (
    <div className="space-y-4">
      {applications.map((app)=>(
        <div key={app._id} className="border p-4">
            <h3 className="font-bold">{app.company}</h3>
            <p>{app.role}</p>
            <p>{app.status}</p>
        </div>
      ))}
    </div>
  )
}
