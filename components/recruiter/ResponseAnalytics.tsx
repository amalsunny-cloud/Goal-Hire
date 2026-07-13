import { RecruiterCommunication } from "@/types/recruiterCommunication";

interface Props{
    communications: RecruiterCommunication[];
}
export default function ResponseAnalytics({communications}:Props) {
    const total = communications.length;

    const positive = communications.filter((c)=>c.responseType==="Positive").length;
    const neutral = communications.filter((c)=>c.responseType==="Neutral").length;
    const rejected = communications.filter((c)=>c.responseType==="Rejected").length;
    const noResponse = communications.filter((c)=>!c.responded || c.responseType==="No Response").length;

    const responded = positive + neutral + rejected;
    const responseRate = total === 0?0:((responded/total)*100).toFixed(1);


  return (
    <div className="border rounded-lg p-6 bg-white shadow-sm">
      <h2 className="text-xl font-semibold mb-6">Recruiter Response Analytics</h2>

      <div className="grid grid-cols-2 md:grid:cols-3 lg:grid-cols-6 gap-4">
        <Card title="Communications" value={total}/>
        <Card title="Positive" value={positive} color="text-green-600"/>
        <Card title="Neutral" value={neutral} color="text-yellow-600"/>
        <Card title="Rejected" value={rejected} color="text-red-600"/>
        <Card title="Waiting" value={noResponse} color="text-gray-600"/>
        <Card title="Response Rate" value={`${responseRate}%`} color="text-blue-600"/>
      </div>
    </div>
  )
}

interface CardProps{
    title:string;
    value:number|string;
    color?:string;
}

function Card({title,value,color="text-black"}:CardProps){
    return(
        <div className="border rounded-lg p-5 text-center bg-gray-50">
            <h3>{title}</h3>
            <p className={`text-3xl font-bold mt-3 ${color}`}>{value}</p>
        </div>
    )
}
