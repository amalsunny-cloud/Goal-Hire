import { RecruiterCommunication } from "@/types/recruiterCommunication";

interface Props{
    communications: RecruiterCommunication[];
}
export default function ResponseAnalytics({communications}:Props) {
    const total = communications.length;
    const responded = communications.filter(c=>c.responded).length;

    const awaiting = total - responded;
    const responseRate = total===0 ? 0:Math.round(responded/total*100);
  return (
    <div className="border rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-6">Response Analytics</h2>

      <div className="grid grid-cols-2 md:grid:cols-4 gap-4">
        <Card title="Communications" value={total}/>
        <Card title="Responses" value={responded}/>
        <Card title="Awaiting" value={awaiting}/>
        <Card title="Response Rate" value={`${responseRate}%`}/>
      </div>
    </div>
  )
}

interface CardProps{
    title:string;
    value:number|string;
}

function Card({title,value}:CardProps){
    return(
        <div className="border rounded-lg p-5 text-center">
            <h3>{title}</h3>
            <p className="text-3xl font-bold mt-3">{value}</p>
        </div>
    )
}
