"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function ForgotPasswordPage() {

  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {

    e.preventDefault();

    setError("");
    setMessage("");
    setLoading(true);

    try {

      const { error } =
        await supabase.auth.resetPasswordForEmail(
          email,
          {
            redirectTo:
              `${window.location.origin}/reset-password`
          }
        );

      if (error) {
        throw error;
      }

      setMessage(
        "Password reset link has been sent to your email."
      );

    } catch (err) {

      setError(
        err.message || "Unable to send reset email."
      );

    } finally {

      setLoading(false);

    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-white">

      <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-8">

        <h1 className="text-3xl font-bold">
          Forgot Password?
        </h1>

        <p className="mt-2 text-slate-400">
          Enter your email to reset your password.
        </p>

        {error && (
          <div className="mt-5 rounded-lg bg-red-900/30 p-3 text-red-300">
            {error}
          </div>
        )}

        {message && (
          <div className="mt-5 rounded-lg bg-green-900/30 p-3 text-green-300">
            {message}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="mt-6 space-y-4"
        >

          <input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3"
            required
          />

          <button
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 py-3 font-semibold"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>

        </form>

        <div className="mt-6 text-center">
          <Link
            href="/login"
            className="text-blue-400 hover:underline"
          >
            Back to Login
          </Link>
        </div>

      </div>

    </main>
  );
}