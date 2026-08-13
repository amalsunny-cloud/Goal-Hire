"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }

      toast.success("Login successful!");

      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Login failed";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-white px-4 py-12">
      <div className="w-full max-w-md space-y-8 bg-slate-400/10 p-8 rounded-2xl shadow-md backdrop-blur-sm">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex w-12 h-12 rounded-xl bg-gray-600/10 border border-gray-500/20 items-center justify-center text-gray-400 font-bold text-xl mb-2">
            G
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-700">
            Welcome back
          </h1>
          <p className="text-sm text-slate-400">
            Sign in to access your job applications dashboard
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-3 text-xs font-medium text-red-400 bg-red-950/50 border border-red-800/50 rounded-lg">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label
              htmlFor="email"
              className="block text-start text-xs  text-gray-500"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="name@company.com"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2.5  border-b border-gray-500/30 text-slate-600 placeholder-slate-300 text-sm focus:outline-none  focus:border-slate-400 transition-all"
              required
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-xs text-gray-500">
                Password
              </label>
              <Link
                href="/auth/forgot-password"
                className="text-xs text-slate-600"
              >
                Forgot password?
              </Link>
            </div>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3.5 py-2.5 border-b border-slate-300 text-slate-600 placeholder-slate-300 text-sm focus:outline-none focus:border-slate-400 transition-all"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-5 px-2 py-2.5 text-base font-semibold text-gray-700 bg-transparent hover:bg-gray-500/20 shadow-sm border border-slate-200 rounded-xl text-center disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-4 w-4 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  ></path>
                </svg>
                Logging in...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        {/* Footer Toggle */}
        <p className="text-center text-xs text-slate-600 pt-2">
          Don't have an account?{" "}
          <Link href="/auth/signup" className="font-semibold text-slate-600">
            Register now
          </Link>
        </p>
      </div>
    </main>
  );
}
