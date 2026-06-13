"use client";
import Link from "next/link";
import { useEffect } from "react";

interface ErrorProps {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Application Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="border rounded-lg p-8 max-w-md w-full text-center shadow-sm">
        <h1 className="text-3xl font-bold mb-4">Something went wrong!</h1>
        <p className="text-gray-500 mb-6">An unexpected error occured.</p>

        <div className="flex gap-3 justify-center">
          <button
            onClick={reset}
            className="bg-black text-white px-4 py-2 rounded"
          >
            Try again
          </button>

          <Link href="/dashboard" className="border flex items-center p-2">
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
