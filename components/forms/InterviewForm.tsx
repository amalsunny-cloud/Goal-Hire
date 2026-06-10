"use client"

import { useRouter } from "next/navigation";
import { useState } from "react"
import toast from "react-hot-toast";

interface InterviewFormProps{
    applicationId: string;
}
export default function InterviewForm({applicationId}:InterviewFormProps) {

    const router = useRouter();
    const [round, setRound] = useState("");
    const [date, setDate] = useState("");
    const [notes, setNotes] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");


    const handleSubmit = async (e:React.SubmitEvent<HTMLFormElement>)=>{
        e.preventDefault();
        try{
            setLoading(true);
            setError("");

            const response = await fetch("/api/interviews",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body:
                    JSON.stringify({
                        applicationId,
                        round,
                        date,
                        notes,
                    })
                }
            );

            const data = await response.json();
            if(!response.ok){
                toast.error("Failed to create interview")
                throw new Error(data.error || "Failed to create interview");
            }
            
            toast.success("Interview added")
            setTimeout(()=>{
                router.refresh();
            },2000)
            
            setRound("");
            setDate("");
            setNotes("");

        }catch(error){
            setError(error instanceof Error ?error.message : "Something went wrong")

            toast.error("Something went wrong")
        }finally{
            setLoading(false);
        }
    }
  return (
    <form onSubmit={handleSubmit}
      className="space-y-4 bg-white p-4 rounded-lg mt-4">
      <h2 className="text-xl font-semibold">Add Interview</h2>
      <input type="text" placeholder="Technical Round" className="border p-2 w-[75%] rounded" value={round} onChange={(e)=>setRound(e.target.value)} required/>

      <input type="date" value={date} onChange={(e)=>setDate(e.target.value)} className="border p-2 w-[75%] rounded"/>
      <textarea placeholder="Interview notes..." value={notes} onChange={(e)=>setNotes(e.target.value)} className="border p-2 w-[75%] rounded"
        rows={3}/>

        {error && (
            <p className="text-red-500">{error}</p>
        )}
<br />
      <button type="submit" disabled={loading} className="bg-gray-500 text-white px-4 py-2 rounded">{loading?"Adding":"Add Interview"}</button>


    </form>
    
  )
}