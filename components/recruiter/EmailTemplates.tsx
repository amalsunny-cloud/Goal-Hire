import { useState } from "react";
import toast from "react-hot-toast";

interface Props{
    recruiterName: string;
    company: string;
}

const templates = {
    application:(recruiter: string, company:string)=>`Hi ${recruiter},

I hope you're doing well.

I wanted to follow up regarding my application for the position at ${company}. I remain very interested in the opportunity and would appreciate any updates regarding the hiring process.

Thank you for your time.

Best regards,`,


interview: (
    recruiter: string,
    company: string,
)=>`Hi ${recruiter},

Thank you again for taking the time to interview me for the role at ${company}.

I enjoyed learning more about the position and the team. I'm excited about the opportunity and look forward to hearing from you.

Best regards,`,


thankyou: (
    recruiter: string,
    company: string,
)=> `Hi ${recruiter},

Thank you very much for your time and consideration.

I appreciate the opportunity to discuss the role at ${company}. It was a pleasure speaking with you.

Best regards,`,


checking: (
    recruiter: string,
    company: string,
)=>`Hi ${recruiter},

I hope you're doing well.

I'm just checking in regarding the position at ${company}. I understand everyone is busy, but I wanted to see if there were any updates.

Thank you.

Best regards,`,

  reconnect: (
    recruiter: string,
    company: string,
  ) => `Hi ${recruiter},

I hope you've been doing well.

I wanted to reconnect and stay in touch regarding opportunities at ${company}. Please keep me in mind if any suitable positions become available.

Best regards,`,
};


export default function EmailTemplates({recruiterName, company}:Props) {
    const [selected, setSelected] = useState<keyof typeof templates>("application");

    const email = templates[selected](recruiterName, company);

    const copy = async()=>{
        await navigator.clipboard.writeText(email);
        toast.success("Copied to clipboard");
    };


  return (
    <div className="border rounded-lg p-6 bg-white shadow-sm">
       <h2 className="text-xl font-semibold mb-6">
        Email Templates
      </h2>

      <select className="border rounded p-2 w-full mb-5" value={selected} onChange={(e)=>setSelected(e.target.value as keyof typeof templates)}>
        <option value="application">Follow-up After Application</option>
        <option value="interview">Follow-up After Interview</option>
        <option value="thankyou">Thank You</option>
        <option value="checking">Checking In</option>
        <option value="reconnect">Keep In Touch</option>
      </select>

      <textarea readOnly value={email} rows={14} className="border rounded p-3 w-full"></textarea>

      <button onClick={copy} className="mt-5 bg-blue-600 text-white px-5 py-2 rounded">Copy Email</button>
    </div>
  )
}

