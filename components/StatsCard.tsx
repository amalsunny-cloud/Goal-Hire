
interface StatsCardProps{
    title: string;
    value: number;
}


export default function StatsCard({ title, value}: StatsCardProps) {
  return (
    <div className="bg-white border rounded-lg p-5">
      <p className="text-gray-500">{title}</p>
      <h2 className="text-3xl font-bold mt-2">{value}</h2>
    </div>
  )
}
