
interface StatsCardProps{
    title: string;
    value: number;
}


export default function StatsCard({ title, value}: StatsCardProps) {
  return (
    <div className="bg-white/90 border rounded-lg p-5">
      <p className="text-gray-800">{title}</p>
      <h2 className="text-3xl font-bold mt-2 text-green-800">{value}</h2>
    </div>
  )
}
