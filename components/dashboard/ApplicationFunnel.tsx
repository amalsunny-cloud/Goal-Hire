interface FunnelItem {
    stage: string;
    value: number;
}
interface ApplicationFunnelProps{
    data: FunnelItem[];
}
export default function ApplicationFunnel({data}:ApplicationFunnelProps) {

    const values = data.map(item => item.value);
    const maxValue = Math.max(...values, 1);
    

    if (data.length === 0) {
  return (
    <div className="border rounded-lg p-6 bg-white">
      <h2 className="text-xl font-semibold mb-6">
        Application Funnel
      </h2>

      <p className="text-gray-500">
        No application data available.
      </p>
    </div>
  );
}

  return (
    <div className="border rounded-lg p-6 bg-white">
      <h2 className="text-xl font-semibold mb-6">Application Funnel</h2>

      <div className="space-y-4">
        {data.map(item=>{
            const width = (item.value / maxValue)*100;

            return(
                <div key={item.stage}>
                    <div className="flex justify-between mb-1">
                        <span>{item.stage}</span>
                        <span>{item.value}</span>
                    </div>

                    <div className="w-full h-4 bg-gray-200 rounded" role="progressbar" aria-valuenow={item.value} aria-valuemin={0} aria-valuemax={maxValue}>
                        <div className="h-4 bg-green-600 rounded transition-all duration-500"
                           style={{ width: `${width}%` }}></div>
                    </div>
                </div>
            )
        })}
      </div>
    </div>
  )
}
