import Footer from "@/components/layout/Footer";
import Navbar2 from "@/components/layout/Navbar2";
import Link from "next/link";

export default function Home() {
  const stats = [
    { label: "Active Job Trackers", value: "1000+" },
    { label: "Applications Tracked", value: "2000+" },
    { label: "Interview Rate Boost", value: "35%" },
  ];

  const features = [
    {
      icon: "📊",
      title: "Visual Kanban Board",
      description: "Drag and drop your applications across Applied, Interviewing, Offer, and Rejected stages.",
    },
    {
      icon: "⏰",
      title: "Smart Reminders",
      description: "Never miss a follow-up email or an interview date with automated alerts.",
    },
    {
      icon: "📈",
      title: "Analytics & Insights",
      description: "Track your response rates, interview conversion, and monthly progress at a glance.",
    },
  ];

  const sampleApps = [
    { company: "Stripe", role: "Frontend Engineer", status: "Interviewing", color: "bg-purple-100 text-purple-700 border-purple-200" },
    { company: "Vercel", role: "Product Designer", status: "Applied", color: "bg-blue-100 text-blue-700 border-blue-200" },
    { company: "Linear", role: "Fullstack Dev", status: "Offer Received", color: "bg-emerald-100 text-emerald-700 border-emerald-200" },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col">
      
      <Navbar2/>
      <main className="flex-1">
        {/* Hero Section */}
        <section className="max-w-full mx-auto px-6 pt-20 pb-16 text-center lg:pt-28">
          <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold text-gray-700 bg-white border border-gray-200 rounded-full mb-6">
            ✨ Take control of your job search
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight max-w-3xl mx-auto leading-tight">
            Track your job hunt with <span className="text-slate-600/40">precision & ease</span>
          </h1>
          <p className="mt-6 text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Stop losing track of spreadsheet rows. Organize applications, schedule follow-ups, and land your dream job faster with Goal-Hire.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/auth/signup"
              className="w-full sm:w-auto px-8 py-3.5 text-base  font-semibold text-gray-700 bg-white hover:bg-gray-500/20 shadow-sm border border-slate-200 rounded-xl transition-all text-center"
            >
              Start Tracking For Free
            </Link>
            <Link
              href="/auth/login"
              className="w-full sm:w-auto px-8 py-3.5 text-base font-semibold text-gray-700 bg-white hover:bg-gray-500/20 shadow-sm border border-slate-200 rounded-xl transition-all text-center"
            >
              Log In to Account
            </Link>
          </div>

         
        </section>

        {/* Stats Bar */}
        <section className="border-y border-slate-200 bg-slate-400/10 py-12">
          <div className="max-w-full mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {stats.map((stat, i) => (
              <div key={i}>
                <p className="text-3xl font-extrabold text-slate-900">{stat.value}</p>
                <p className="text-sm font-medium text-slate-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Key Features */}
        <section className="max-w-6xl mx-auto px-6 py-20">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-slate-900">Everything you need to land the offer</h2>
            <p className="mt-3 text-slate-600">Built specifically for modern job seekers.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <div key={i} className="p-8 bg-slate-400/10 border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-slate-900">{feature.title}</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Banner */}
        <section className="max-w-6xl mx-auto px-6 pb-20">
          <div className="bg-slate-400/10 rounded-3xl p-10 md:p-14 text-center text-gray-700 shadow-md shadow-slate-600/10">
            <h2 className="text-3xl font-bold">Ready to organize your career search?</h2>
            <p className="mt-3 text-gray-700 max-w-xl mx-auto">
              Join thousands of job seekers managing their applications cleanly and effectively.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Link
                href="/auth/signup"
                className="px-6 py-3 font-semibold text-gray-700 bg-white hover:bg-slate-900/10 border border-slate-200 rounded-xl transition-all"
              >
                Create Account
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer/>
    </div>
  );
}