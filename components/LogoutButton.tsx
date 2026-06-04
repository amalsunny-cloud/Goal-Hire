"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
const router = useRouter();

    const handleLogout = async()=>{
        try{
            const response = await fetch("/api/auth/logout",{
                method: "POST",
            })

            if(!response.ok){
                throw new Error("Logout Failed");
            }

            router.replace("/auth/login")
        }catch(error){
            console.error("Logout Error",error);
            
        }
    }
  return (
    <button onClick={handleLogout}
      className="
        bg-red-500
        text-white
        px-4
        py-2
        rounded
      ">
      Logout
    </button>
  )
}
function usseRouter() {
    throw new Error("Function not implemented.");
}

