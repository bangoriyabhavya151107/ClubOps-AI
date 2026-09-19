"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {

  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e) {

    e.preventDefault();

    setError("");
    setLoading(true);

    try {

      const { data, error } =
        await supabase.auth.signInWithPassword({
          email,
          password
        });

      if (error) {
        throw error;
      }

      const user = data.user;

      if (!user) {
        throw new Error("User login failed.");
      }

      const { data: profile, error: profileError } =
        await supabase
          .from("profiles")
          .select("id, full_name, email, phone, role, profile_image")
          .eq("id", user.id)
          .single();

      if (profileError) {
        throw profileError;
      }

      if (profile.role === "ADMIN") {
        router.push("/dashboard?role=admin");
      }

      else if (profile.role === "COORDINATOR") {
        router.push("/dashboard?role=coordinator");
      }

      else {
        router.push("/dashboard?role=volunteer");
      }

    } catch (err) {

      setError(
        err.message || "Invalid email or password."
      );

    } finally {

      setLoading(false);

    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-white">

      <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-8">

        <h1 className="text-3xl font-bold">
          Welcome Back
        </h1>

        <p className="mt-2 text-slate-400">
          Login to ClubOps AI
        </p>

        {error && (
          <div className="mt-5 rounded-lg bg-red-900/30 p-3 text-sm text-red-300">
            {error}
          </div>
        )}

        <form
          onSubmit={handleLogin}
          className="mt-6 space-y-4"
        >

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-blue-500"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-blue-500"
            required
          />

          <div className="text-right">

            <Link
              href="/forgot-password"
              className="text-sm text-blue-400 hover:underline"
            >
              Forgot Password?
            </Link>

          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 py-3 font-semibold hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        <p className="mt-6 text-center text-sm text-slate-400">

          Don't have an account?{" "}

          <Link
            href="/register"
            className="text-blue-400 hover:underline"
          >
            Create Account
          </Link>

        </p>

      </div>

    </main>
  );
}