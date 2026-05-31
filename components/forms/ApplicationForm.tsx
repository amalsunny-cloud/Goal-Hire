"use client"

import { useState } from "react";

export default function ApplicationForm() {
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");


  const handleSubmit =async(e: React.SubmitEvent<HTMLFormElement>) =>{
    e.preventDefault();

    const response = await fetch("api/applications",{
      method: "POST",
      headers: {
        "Content-Type":"application/json",
      },
      body:JSON.stringify({
        company,
        role,
      }),
    });

    if(response.ok){
      setCompany("");
      setRole("");
    }
  }
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Company"
        className="border p-2 w-full"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />
      <input
        type="text"
        placeholder="Role"
        className="border p-2 w-full"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      />
      <button type="submit" className="bg-black text-white px-4 py-2">
        Add Application
      </button>
    </form>
  );
}
