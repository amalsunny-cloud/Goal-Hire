import Link from "next/link";

export default function Navbar2() {
  return (
    <nav className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-400 text-white transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Title */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center shadow-md shadow-gray-500/20 group-hover:scale-105 transition-transform">
              <img src="/Goal-Hire-Logo.webp" alt="Goal-Hire Logo" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight bg-clip-text text-transparent bg-slate-400">
                Goal-Hire
              </span>
              <span className="text-[10px] uppercase tracking-wider text-white font-semibold -mt-1">
                Tracker
              </span>
            </div>
          </Link>

          

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <Link
              href="/auth/login"
              className="px-4 py-2 bg-transparent border border-gray-300/20 text-xs text-gray-300 rounded-lg shadow-sm  hover:shadow-md transition-colors"
            >
              Log In
            </Link>
            <Link
              href="/auth/signup"
              className="px-4 py-2 bg-transparent border border-gray-300/20 text-xs text-gray-300 rounded-lg shadow-sm hover:shadow-md transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}