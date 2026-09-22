import ProfileForm from "@/components/dashboard/ProfileForm";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
      <Link
        href="/dashboard"
        className="group inline-flex items-center mb-4 gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-600 shadow-sm transition-all duration-200 hover:-translate-x-0.5 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
      >
        <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-x-0.5" />
        Back to Dashboard
      </Link>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">My Profile</h1>

        <p className="mt-1 text-sm text-slate-500">
          Manage your professional information, skills, experience, and career
          links.
        </p>
      </div>

      <ProfileForm />
    </main>
  );
}
