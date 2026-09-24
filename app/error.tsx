"use client";
import Image from "next/image";
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
      <div className="bg-white border border-gray-200 flex flex-col justify-center items-center rounded-lg p-8 max-w-md w-full text-center shadow-sm">
        <Image src="/warning.svg" alt="Warning Icon" width={64} height={64} className="mb-4" />
        <h1 className="text-3xl font-bold mb-4">Something went wrong!</h1>
        <p className="text-gray-500 mb-6">An unexpected error occured.</p>

        <div className="flex gap-3 justify-center">
          <button
            onClick={reset}
            className="bg-black text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-800 transition-colors"
          >
            Try again
          </button>

          <Link href="/dashboard" className="bg-slate-50 border border-gray-300 flex items-center rounded-lg p-2 hover:bg-gray-200 transition-colors">
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
