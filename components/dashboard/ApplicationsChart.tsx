import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface Props {
    data: {
        month: string;
        applications: number;
    }[];
}
export default function ApplicationsChart({data}: Props) {
  
  if (data.length === 0) {
  return (
    <div className="border rounded-lg p-6 bg-white">
      <h2 className="text-xl font-semibold mb-4">
        Applications Per Month
      </h2>

      <p className="text-gray-500">
        No application data available.
      </p>
    </div>
  );
}

  return (
    <div className="border rounded-lg p-6 bg-white">
      <h2 className="text-xl font-semibold mb-4">Applications Per Month</h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{
    top: 10,
    right: 20,
    left: 0,
    bottom: 10,
  }}>
            <XAxis dataKey="month"/>
            <YAxis/>
            <Tooltip formatter={(value) => [`${value}`, "Applications"]}/>
            <Bar dataKey="applications" radius={[6, 6, 0, 0]}/>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
