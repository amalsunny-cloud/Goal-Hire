interface FunnelItem {
    stage: string;
    value: number;
}
interface Props{
    data: FunnelItem[];
}
export default function ApplicationFunnel({data}:Props) {

    const maxValue = Math.max(...data.map(item=>item.value),1)
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

                    <div className="w-full h-4 bg-gray-200 rounded">
                        <div className="h-4 bg-black rounded" style={{width: `${width}%`}}></div>
                    </div>
                </div>
            )
        })}
      </div>
    </div>
  )
}
