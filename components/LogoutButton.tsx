"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

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
        throw new Error(
          data.message ?? "Logout failed."
        );
      }

      toast.success("Logged out successfully.");

      router.replace("/auth/login");
      router.refresh();
    } catch (error) {
      console.error(error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong."
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
      className="
        bg-slate-600
        text-white
        cursor-pointer
        px-4
        py-2
        rounded-xl
        disabled:opacity-50
        disabled:cursor-not-allowed
      "
    >
      {loading ? "Logging out..." : "Logout"}
    </button>
  );
}