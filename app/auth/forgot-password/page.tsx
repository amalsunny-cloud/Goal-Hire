"use client";

import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        "/api/auth/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email.trim(),
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            "Something went wrong",
        );
      }

      setSubmitted(true);

      toast.success(
        "Check your email for the reset link",
      );
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Something went wrong";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-white px-4 py-12">
      <div className="w-full max-w-md space-y-8 bg-slate-400/10 p-8 rounded-2xl shadow-md">
        <div className="text-center space-y-2">
          <div className="inline-flex w-12 h-12 rounded-xl bg-gray-600/10 border border-gray-500/20 items-center justify-center text-gray-400 font-bold text-xl">
            G
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-gray-700">
            Forgot Password?
          </h1>

          <p className="text-sm text-slate-400">
            Enter your email and we'll send you
            a password reset link.
          </p>
        </div>

        {submitted ? (
          <div className="space-y-5">
            <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
              <p className="text-sm text-green-700">
                If an account exists for this
                email, you will receive a
                password reset link shortly.
              </p>
            </div>

            <Link
              href="/auth/login"
              className="block text-center w-full bg-black text-white py-2.5 rounded-xl"
            >
              Back to Login
            </Link>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="block text-xs text-gray-500"
              >
                Email Address
              </label>

              <input
                id="email"
                type="email"
                placeholder="name@company.com"
                autoComplete="email"
                required
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-slate-900/10"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-2 py-2.5 text-base font-semibold text-white bg-black hover:bg-gray-700 rounded-xl disabled:opacity-50"
            >
              {loading
                ? "Sending..."
                : "Send Reset Link"}
            </button>
          </form>
        )}

        <p className="text-center text-xs text-slate-600">
          Remember your password?{" "}
          <Link
            href="/auth/login"
            className="font-semibold"
          >
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}