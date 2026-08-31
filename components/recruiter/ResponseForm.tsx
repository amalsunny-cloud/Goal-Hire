"use client"
import { useState } from "react"
import toast from "react-hot-toast";

interface Props{
    communicationId: string;
    onSuccess:()=>void;
}

export default function ResponseForm({communicationId, onSuccess}:Props) {
    const [responseType, setResponseType] = useState("Positive");
    const [responseDate, setResponseDate] = useState("");
    const [responseNotes, setResponseNotes] = useState("");
    const [loading, setLoading] = useState(false);

    const saveResponse = async()=>{
        try{
            setLoading(true);
            const response = await fetch(`/api/recruiter-communications/${communicationId}`,{
                method: "PATCH",
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    responded: true,
                    responseType,
                    responseDate,
                    responseNotes
                })
            })

                if(!response.ok){
                    throw new Error();
                    
                }
            toast.success("Response saved");
            onSuccess();
        }catch(error){
            console.error(error);
            toast.error("Failed");
        } finally{
            setLoading(false);
        }
    }
  return (
    <div className="border border-slate-300/60 rounded-lg p-4 sm:p-5 mt-4 space-y-4 bg-white/60">
      <h3 className="font-semibold text-slate-800">Recruiter Response</h3>

      <select
        value={responseType}
        onChange={(e) => setResponseType(e.target.value)}
        className="border border-slate-300 rounded-lg p-2.5 w-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
      >
        <option>Positive</option>
        <option>Neutral</option>
        <option>Rejected</option>
        <option>No Response</option>
      </select>

      <input
        type="date"
        value={responseDate}
        onChange={(e) => setResponseDate(e.target.value)}
        className="pl-3 pr-3 py-2.5 bg-slate-50 border border-slate-200 w-full rounded-xl text-slate-800 placeholder-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 transition-all"
      />

      <textarea
        rows={4}
        placeholder="Recruiter reply..."
        value={responseNotes}
        onChange={(e) => setResponseNotes(e.target.value)}
        className="pl-3 pr-3 py-2.5 bg-slate-50 border border-slate-200 w-full rounded-xl text-slate-800 placeholder-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 transition-all resize-y"
      />

      <button
        disabled={loading}
        onClick={saveResponse}
        className="bg-green-600 hover:bg-green-700 text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors cursor-pointer w-full sm:w-auto disabled:opacity-50"
      >
        {loading ? "Saving..." : "Save Response"}
      </button>
    </div>
  );
}
