"use client";
import { ChevronDown, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Navbar2() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const isDashboardPage = pathname?.startsWith("/dashboard");

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-slate-900/85 backdrop-blur-md border-b border-slate-700 text-white transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Title */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center overflow-hidden shadow-md shadow-gray-500/20 group-hover:scale-105 transition-transform">
              <Image src="/Goal-Hire-Logo.webp" alt="Goal-Hire Logo" width={36} height={36} />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight bg-clip-text text-transparent bg-slate-200">
                Goal-Hire
              </span>
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold -mt-1">
                Tracker
              </span>
            </div>
          </Link>

          {/* Dashboard AI Tools Dropdown */}
          {isDashboardPage && (
            <div className="relative inline-block" ref={dropdownRef}>
              <button 
                onClick={() => setIsOpen(!isOpen)} 
                className="inline-flex items-center gap-2 px-4 py-2 bg-transparent border border-gray-300/20 text-xs text-gray-300 rounded-lg shadow-sm hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <Sparkles className="h-4 w-4 text-indigo-400" />
                AI Tools
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
              </button>

              {isOpen && (
                <div className="absolute right-0 mt-2 w-52 rounded-xl bg-slate-800 border border-slate-700 shadow-xl py-1.5 z-50 flex flex-col">
                  <Link
                    href="/dashboard/ai/job-analyzer"
                    className="flex items-center gap-2 px-4 py-2.5 text-xs font-medium text-gray-200 hover:bg-slate-700/60 hover:text-white transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
                    Job Analyzer
                  </Link>

                  <Link
                    href="/dashboard/ai/resume-analyzer"
                    className="flex items-center gap-2 px-4 py-2.5 text-xs font-medium text-gray-200 hover:bg-slate-700/60 hover:text-white transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
                    Resume Analyzer
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* Action Buttons (Non-Dashboard) */}
          {!isDashboardPage && (
            <div className="flex items-center gap-3">
              <Link
                href="/auth/login"
                className="px-4 py-2 bg-transparent border border-gray-300/20 text-xs text-gray-300 rounded-lg shadow-sm hover:bg-slate-800 transition-colors"
              >
                Log In
              </Link>
              <Link
                href="/auth/signup"
                className="px-4 py-2 bg-indigo-600 border border-indigo-500 text-xs text-white rounded-lg shadow-sm hover:bg-indigo-500 transition-colors"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}