"use client";

import { useState } from "react";
import Link from "next/link";

import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleLogin(e) {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!email.trim()) {
      setError("Please enter your email.");
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    try {
      setLoading(true);

      const { data, error: loginError } =
        await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });

      if (loginError) {
        setError(loginError.message);
        return;
      }

      if (!data?.user) {
        setError("Login failed. Please try again.");
        return;
      }

      setSuccess("Login successful! Opening dashboard...");

      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 500);
    } catch (error) {
      console.error("Login error:", error);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="login-page">
      <div className="login-container">

        {/* LEFT SIDE */}
        <section className="login-info">

          <Link href="/" className="login-logo">

            <div className="login-logo-icon">
              C
            </div>

            <div>
              <strong>ClubOps AI</strong>
              <span>College Club Management</span>
            </div>

          </Link>


          <div className="login-info-content">

            <span className="login-badge">
              ✨ AI-Powered Club Management
            </span>

            <h1>
              Welcome back to
              <span> ClubOps AI</span>
            </h1>

            <p>
              Manage your college club, events, members,
              tasks and activities from one intelligent platform.
            </p>


            <div className="login-features">

              <div>

                <span>📅</span>

                <div>
                  <strong>Manage Events</strong>

                  <p>
                    Plan and organize club events.
                  </p>
                </div>

              </div>


              <div>

                <span>👥</span>

                <div>
                  <strong>Manage Members</strong>

                  <p>
                    Coordinate your complete team.
                  </p>
                </div>

              </div>


              <div>

                <span>🤖</span>

                <div>
                  <strong>AI Assistant</strong>

                  <p>
                    Get intelligent help for your club.
                  </p>
                </div>

              </div>

            </div>

          </div>

        </section>


        {/* RIGHT SIDE */}
        <section className="login-card-wrapper">

          <div className="login-card">

            <div className="login-card-header">

              <div className="mobile-login-logo">

                <div className="login-logo-icon">
                  C
                </div>

              </div>

              <h2>
                Welcome Back
              </h2>

              <p>
                Login to your ClubOps AI account
              </p>

            </div>


            {/* ERROR MESSAGE */}
            {error && (
              <div className="login-error">
                ❌ {error}
              </div>
            )}


            {/* SUCCESS MESSAGE */}
            {success && (
              <div className="login-success">
                ✅ {success}
              </div>
            )}


            <form onSubmit={handleLogin}>

              {/* EMAIL */}
              <div className="login-field">

                <label htmlFor="email">
                  Email Address
                </label>

                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  disabled={loading}
                />

              </div>


              {/* PASSWORD */}
              <div className="login-field">

                <div className="password-label-row">

                  <label htmlFor="password">
                    Password
                  </label>

                  <Link href="/forgot-password">
                    Forgot Password?
                  </Link>

                </div>

                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  disabled={loading}
                />

              </div>


              {/* LOGIN BUTTON */}
              <button
                type="submit"
                className="login-submit"
                disabled={loading}
              >
                {loading
                  ? "Logging in..."
                  : "Login"}
              </button>

            </form>


            {/* DIVIDER */}
            <div className="login-divider">
              <span>OR</span>
            </div>


            {/* REGISTER */}
            <p className="register-link">

              Don't have an account?{" "}

              <Link href="/register">
                Create Account
              </Link>

            </p>


            {/* HOME */}
            <Link
              href="/"
              className="back-home"
            >
              ← Back to Home
            </Link>

          </div>

        </section>

      </div>
    </main>
  );
}