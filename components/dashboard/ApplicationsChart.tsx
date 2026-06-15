import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface Props {
    data: {
        month: string;
        applications: number;
    }[];
}
export default function ApplicationsChart({data}: Props) {
  return (
    <div className="border rounded-lg p-6 bg-white">
      <h2 className="text-xl font-semibold mb-4">Applications Per Month</h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
            <XAxis dataKey="month"/>
            <YAxis/>
            <Tooltip/>
            <Bar dataKey="applications"/>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
