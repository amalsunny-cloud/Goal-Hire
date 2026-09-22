"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = useCallback(async () => {
    try {
      setLoading(true);

      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message ?? "Logout failed.");
      }

      toast.success("Logged out successfully.");

      router.replace("/auth/login");
      router.refresh();
    } catch (error) {
      console.error(error);

      toast.error(
        error instanceof Error ? error.message : "Something went wrong.",
      );
    } finally {
      setLoading(false);
    }
  }, [router]);

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={loading}
      aria-label="Log out"
      className="rounded-xl flex justify-between border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-600 shadow-sm transition hover:-translate-y-0.5 cursor-pointer hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600 disabled:cursor-not-allowed disabled:opacity-50"
    > <LogOut color="red" className="h-4 w-4 me-1" />
      {loading ? "Logging out..." : "Logout"}
    </button>
  );
}
