export default function DashboardLoading() {
  return (
    <div className="p-6 space-y-4">
      <div className="h-10 w-64 bg-gray-200 rounded animate-pulse" />
      <div className="grid grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="h-24 bg-gray-200 rounded animate-pulse" />
        ))}
      </div>
    </div>
  );
}
