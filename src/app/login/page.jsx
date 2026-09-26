"use client";

import { Suspense } from "react";
import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Eye, EyeOff } from "lucide-react";
import styles from "./login.module.css";

/* ======================================================
   Inner component uses useSearchParams — must be inside Suspense
   ====================================================== */
function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();

  const registered = searchParams.get("registered") === "1";
  const redirectTo = searchParams.get("redirect") || "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  async function handleLogin(event) {
    event.preventDefault();

    if (loading) return;

    setError("");

    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail) {
      setError("Please enter your email address.");
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    try {
      setLoading(true);

      const { data: authData, error: authError } =
        await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password,
        });

      if (authError) {
        if (
          authError.message?.toLowerCase().includes("invalid login credentials")
        ) {
          throw new Error(
            "Invalid email or password. Please check your credentials."
          );
        }
        throw new Error(authError.message || "Unable to sign in.");
      }

      if (!authData?.user) {
        throw new Error("Authentication succeeded but no user was returned.");
      }

      const { data: workspace, error: workspaceError } =
        await supabase.rpc("ensure_user_workspace");

      if (workspaceError) {
        await supabase.auth.signOut();
        throw new Error(
          workspaceError.message ||
            "Your workspace could not be initialized. Please contact your admin."
        );
      }

      if (!workspace) {
        await supabase.auth.signOut();
        throw new Error("No workspace was returned for your account.");
      }

      if (!workspace?.club?.id) {
        await supabase.auth.signOut();
        throw new Error(
          "Your account is not connected to a club workspace. Please contact your admin."
        );
      }

      router.replace(redirectTo);
      router.refresh();
    } catch (loginError) {
      console.error("Login error:", loginError);
      setError(
        loginError?.message ||
          "Unable to login. Please check your email and password."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.card}>
      <span className={styles.smallLabel}>CLUBOPS AI</span>

      <h2>Welcome back</h2>

      <p className={styles.subtitle}>Sign in to your club workspace.</p>

      {registered && (
        <div className={styles.successMsg}>
          Account created! Please sign in to continue.
        </div>
      )}

      {error && (
        <div className={styles.error} role="alert">
          {error}
        </div>
      )}

      <form onSubmit={handleLogin}>
        <div className={styles.fieldGroup}>
          <label className={styles.fieldLabel} htmlFor="email">
            Email address
          </label>
          <div className={styles.inputWrap}>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
              autoFocus
              disabled={loading}
            />
          </div>
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.fieldLabel} htmlFor="password">
            Password
          </label>
          <div className={styles.inputWrap}>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your password"
              autoComplete="current-password"
              disabled={loading}
            />
            <button
              type="button"
              className={styles.eyeBtn}
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          <div className={styles.forgotLink}>
            <Link href="/forgot-password">Forgot password?</Link>
          </div>
        </div>

        <button
          type="submit"
          className={styles.submitBtn}
          disabled={loading}
        >
          {loading && <span className={styles.spinner} />}
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>

      <div className={styles.divider}>
        <span>OR</span>
      </div>

      <p className={styles.register}>
        New to ClubOps?{" "}
        <Link href="/register">Create your workspace</Link>
      </p>

      <Link href="/" className={styles.home}>
        ← Back to home
      </Link>
    </div>
  );
}

/* ======================================================
   Page component — wraps LoginForm in Suspense
   ====================================================== */
export default function LoginPage() {
  return (
    <main className={styles.page}>
      {/* ==================== BRAND PANEL ==================== */}
      <section className={styles.brandPanel}>
        <div className={styles.brand}>
          <div className={styles.logo}>C</div>
          <div>
            <strong>ClubOps AI</strong>
            <span>Smart Club Operations</span>
          </div>
        </div>

        <div className={styles.brandContent}>
          <span className={styles.badge}>
            AI-POWERED CLUB MANAGEMENT · LIVE
          </span>

          <h1>
            Run your club.
            <br />
            <span>Not your spreadsheets.</span>
          </h1>

          <p>
            Events, volunteers, tasks, meetings, budgets, risks and AI
            assistance in one modern workspace built for student clubs.
          </p>

          <div className={styles.features}>
            <div>Real-time event operations</div>
            <div>Volunteer and task management</div>
            <div>AI planning and communication</div>
            <div>Budget and risk visibility</div>
          </div>
        </div>
      </section>

      {/* ==================== FORM PANEL ==================== */}
      <section className={styles.formPanel}>
        <Suspense
          fallback={
            <div className={styles.card}>
              <div
                style={{
                  height: 14,
                  width: 80,
                  borderRadius: 4,
                  background: "#f1f5f9",
                  marginBottom: 12,
                  animation: "skeletonShimmer 1.4s ease infinite",
                  backgroundSize: "400px 100%",
                  backgroundImage:
                    "linear-gradient(90deg, #f1f5f9 25%, #e8eef5 50%, #f1f5f9 75%)",
                }}
              />
            </div>
          }
        >
          <LoginForm />
        </Suspense>
      </section>
    </main>
  );
}