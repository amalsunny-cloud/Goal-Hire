"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const token = searchParams.get("token") || "";

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!token) {
      toast.error(
        "Invalid password reset link",
      );
      return;
    }

    if (password.length < 8) {
      toast.error(
        "Password must be at least 8 characters",
      );
      return;
    }

    if (password !== confirmPassword) {
      toast.error(
        "Passwords do not match",
      );
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "/api/auth/reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token,
            newPassword: password,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            "Password reset failed",
        );
      }

      toast.success(
        "Password reset successfully",
      );

      setTimeout(() => {
        router.push("/auth/login");
      }, 1500);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Password reset failed";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-md border rounded-2xl p-8 text-center shadow-md">
          <h1 className="text-2xl font-bold mb-4">
            Invalid Reset Link
          </h1>

          <p className="text-gray-500 mb-6">
            This password reset link is
            missing or invalid.
          </p>

          <Link
            href="/auth/forgot-password"
            className="bg-black text-white px-4 py-2 rounded-lg"
          >
            Request New Link
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-white px-4 py-12">
      <div className="w-full max-w-md space-y-8 bg-slate-400/10 p-8 rounded-2xl shadow-md">
        <div className="text-center space-y-2">
          <div className="inline-flex w-12 h-12 rounded-xl bg-gray-600/10 border border-gray-500/20 items-center justify-center text-gray-400 font-bold text-xl">
            G
          </div>

          <h1 className="text-3xl font-bold text-gray-700">
            Reset Password
          </h1>

          <p className="text-sm text-slate-400">
            Create a new password for your
            Goal-Hire account.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <div className="space-y-1.5">
            <label
              htmlFor="password"
              className="block text-xs text-gray-500"
            >
              New Password
            </label>

            <input
              id="password"
              type="password"
              autoComplete="new-password"
              required
              minLength={8}
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-slate-900/10"
              placeholder="Minimum 8 characters"
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="confirmPassword"
              className="block text-xs text-gray-500"
            >
              Confirm Password
            </label>

            <input
              id="confirmPassword"
              type="password"
              autoComplete="new-password"
              required
              minLength={8}
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(
                  e.target.value,
                )
              }
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-slate-900/10"
              placeholder="Confirm your password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-2 py-2.5 text-base font-semibold text-white bg-black hover:bg-gray-700 rounded-xl disabled:opacity-50"
          >
            {loading
              ? "Resetting..."
              : "Reset Password"}
          </button>
        </form>

        <p className="text-center text-xs text-slate-600">
          <Link
            href="/auth/login"
            className="font-semibold"
          >
            Back to Login
          </Link>
        </p>
      </div>
    </main>
  );
}