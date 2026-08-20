import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/85 text-slate-900 backdrop-blur-xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Title */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-linear-to-tr from-blue-600 to-indigo-500 flex items-center justify-center font-bold text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform duration-200">
              G
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-slate-900">
                Goal-Hire
              </span>
              <span className="text-[10px] uppercase tracking-[0.16em] text-blue-600 font-bold -mt-1">
                Tracker
              </span>
            </div>
          </Link>

          {/* Quick Navigation Links */}
          <div className="hidden md:flex items-center gap-1 rounded-xl border border-slate-200 bg-slate-50/80 p-1 text-sm font-medium text-slate-600">
            <Link
              href="/dashboard"
              className="rounded-lg px-3 py-1.5 hover:bg-white hover:text-slate-900 hover:shadow-sm transition-all"
            >
              Dashboard
            </Link>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <Link
              href="/auth/login"
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-950 transition-colors"
            >
              Log In
            </Link>
            <Link
              href="/auth/signup"
              className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-md shadow-blue-600/20 transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
