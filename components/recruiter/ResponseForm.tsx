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
    <div className="border rounded-lg p-5 mt-5 space-y-4">
      <h3 className="font-semibold">Recruiter Response</h3>

      <select value={responseType} onChange={(e)=>setResponseType(e.target.value as "Positive" | "Neutral" | "Rejected")}>
        <option>Positive</option>
        <option>Neutral</option>
        <option>Rejected</option>
      </select>

      <input type="date" value={responseDate} onChange={(e)=>setResponseDate(e.target.value)} className="bordedr rounded p-2 w-full"/>

      <textarea rows={4} placeholder="Response notes" value={responseNotes} onChange={(e)=>setResponseNotes(e.target.value)} className="border rounded p-2 w-full"></textarea>

      <button disabled={loading} onClick={saveResponse} className="bg-green-600 text-white rounded px-4 py-2">{loading?"Saving...":"Save Response"}</button>
    </div>
  )
}
