"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function LogoutButton() {
const router = useRouter();

    const handleLogout = async()=>{
        try{
            const response = await fetch("/api/auth/logout",{
                method: "POST",
            })

            if(!response.ok){
                toast.error("Logout Failed")
                throw new Error("Logout Failed");
            }

            toast.success("Logout successful")
            setTimeout(()=>{
                router.replace("/auth/login")
            },2000)
            
        }catch(error){
            console.error("Logout Error",error);
            toast.error("Logout error")
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

