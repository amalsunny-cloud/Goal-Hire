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
      className="space-y-4 bg-white p-4 sm:p-5 rounded-lg mt-4 shadow-xs">
      <h2 className="text-xl font-semibold">Add Interview</h2>
      <input type="text" placeholder="Technical Round" className="px-3.5 py-2.5 border-b border-gray-500/30 text-slate-600 placeholder-slate-300 text-sm focus:outline-none focus:border-slate-500 transition-all w-full" value={round} onChange={(e)=>setRound(e.target.value)} required/>

      <input type="date" value={date} onChange={(e)=>setDate(e.target.value)} className="px-3.5 py-2.5 border-b border-gray-500/30 text-slate-600 placeholder-slate-300 text-sm focus:outline-none focus:border-slate-500 transition-all w-full"/>

      <textarea placeholder="Interview notes..." value={notes} onChange={(e)=>setNotes(e.target.value)} className="px-3.5 py-2.5 border-b border-gray-500/30 text-slate-600 placeholder-slate-300 text-sm focus:outline-none focus:border-slate-500 transition-all w-full resize-y"
        rows={3}/>

        {error && (
            <p className="text-red-500 text-sm">{error}</p>
        )}

      <div>
        <button type="submit" disabled={loading} className="bg-slate-800 hover:bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors w-full sm:w-auto disabled:opacity-50">{loading?"Adding...":"Add Interview"}</button>
      </div>
    </form>
  )
}