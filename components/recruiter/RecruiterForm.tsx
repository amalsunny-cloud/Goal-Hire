"use client";

import { useState } from "react";
import toast from "react-hot-toast";

interface Props {
  applicationId: string;
  onSuccess?: () => void;
}

export default function RecruiterForm({ applicationId, onSuccess }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [lastContact, setLastContact] = useState("");
  const [nextFollowUp, setNextFollowUp] = useState("");
  const [notes, setNotes] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await fetch("/api/recruiters", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          applicationId,
          name,
          email,
          phone,
          linkedin,
          lastContact,
          nextFollowUp,
          notes,
          tags,
        }),
      });

      if (!response.ok) {
        throw new Error();
      }
      console.log("response is:",response);

      toast.success("Recruiter added");

      setName("");
      setEmail("");
      setPhone("");
      setLinkedin("");
      setLastContact("");
      setNextFollowUp("");
      setNotes("");
      onSuccess?.();
    } catch (error) {
      console.error(error);
      toast.error("Failed to add recruiter");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <form
      onSubmit={handleSubmit}
      className="
        border
        rounded-lg
        p-6
        space-y-4
      "
    >
      <h2
        className="
          text-xl
          font-semibold
        "
      >
        Recruiter Information
      </h2>

      <input
        type="text"
        placeholder="Recruiter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="
          border
          p-2
          rounded
          w-full
        "
      />

      <input
        type="email"
        placeholder="Recruiter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="
          border
          p-2
          rounded
          w-full
        "
      />

      <input
        type="text"
        placeholder="Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="
          border
          p-2
          rounded
          w-full
        "
      />

      <input
        type="url"
        placeholder="LinkedIn URL"
        value={linkedin}
        onChange={(e) => setLinkedin(e.target.value)}
        className="
          border
          p-2
          rounded
          w-full
        "
      />

      <div>
        <label>Last Contact</label>

        <input
          type="date"
          value={lastContact}
          onChange={(e) => setLastContact(e.target.value)}
          className="
            border
            p-2
            rounded
            w-full
          "
        />
      </div>

      <div>
        <label>Next Follow-up</label>

        <input
          type="date"
          value={nextFollowUp}
          onChange={(e) => setNextFollowUp(e.target.value)}
          className="
            border
            p-2
            rounded
            w-full
          "
        />
      </div>

      <textarea
        rows={5}
        placeholder="Notes"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        className="
          border
          p-2
          rounded
          w-full
        "
      />

      <button
        type="submit"
        disabled={loading}
        className="
          bg-black
          text-white
          px-4
          py-2
          rounded
          disabled:opacity-50
        "
      >
        {loading ? "Saving..." : "Save Recruiter"}
      </button>
    </form>

    
</>
  );
}
