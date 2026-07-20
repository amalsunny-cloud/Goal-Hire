
interface StatsCardProps{
    title: string;
    value: string | number;
}


export default function StatsCard({ title, value}: StatsCardProps) {
  return (
    <div className="bg-white rounded-xl border shadow-sm p-5 transition-shadow hover:shadow-md">
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <h2 className="text-3xl font-bold mt-2 text-green-800">{value}</h2>
    </div>
  )
}
