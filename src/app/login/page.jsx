"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import styles from "./login.module.css";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

      /*
       * STEP 1
       * Authenticate with Supabase Auth.
       */
      const {
        data: authData,
        error: authError,
      } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password,
      });

      if (authError) {
        console.error("Supabase authentication error:", authError);

        if (
          authError.message?.toLowerCase().includes(
            "invalid login credentials"
          )
        ) {
          throw new Error(
            "Invalid email or password. Please check the exact email and password for your ClubOps account."
          );
        }

        throw new Error(
          authError.message || "Unable to sign in."
        );
      }

      if (!authData?.user) {
        throw new Error(
          "Authentication succeeded but no user was returned."
        );
      }

      /*
       * STEP 2
       * Make sure the user's ClubOps workspace exists.
       *
       * The database function now correctly stores
       * ADMIN / COORDINATOR / VOLUNTEER in uppercase.
       */
      const {
        data: workspace,
        error: workspaceError,
      } = await supabase.rpc("ensure_user_workspace");

      if (workspaceError) {
        console.error(
          "Workspace initialization error:",
          workspaceError
        );

        await supabase.auth.signOut();

        throw new Error(
          workspaceError.message ||
            "Your account was authenticated, but your ClubOps workspace could not be initialized."
        );
      }

      if (!workspace) {
        await supabase.auth.signOut();

        throw new Error(
          "Your account was authenticated, but no ClubOps workspace was returned."
        );
      }

      if (!workspace?.club?.id) {
        await supabase.auth.signOut();

        throw new Error(
          "Your account is not connected to a ClubOps club workspace."
        );
      }

      /*
       * STEP 3
       * Login completed successfully.
       */
      router.replace("/dashboard");
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
    <main className={styles.page}>
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
            AI-POWERED CLUB MANAGEMENT
          </span>

          <h1>
            Run your club.
            <br />
            <span>Not your spreadsheets.</span>
          </h1>

          <p>
            Events, volunteers, tasks, meetings, budgets,
            risks and AI assistance in one workspace.
          </p>

          <div className={styles.features}>
            <div>✓ Real-time event operations</div>
            <div>✓ Volunteer and task management</div>
            <div>✓ AI planning and communication</div>
            <div>✓ Budget and risk visibility</div>
          </div>
        </div>
      </section>

      <section className={styles.formPanel}>
        <div className={styles.card}>
          <span className={styles.smallLabel}>
            CLUBOPS AI
          </span>

          <h2>Welcome back</h2>

          <p className={styles.subtitle}>
            Sign in to your club workspace.
          </p>

          {error && (
            <div
              className={styles.error}
              role="alert"
            >
              {error}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <label>
              Email

              <input
                type="email"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                placeholder="you@example.com"
                autoComplete="email"
                autoFocus
                disabled={loading}
              />
            </label>

            <label>
              Password

              <input
                type="password"
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                placeholder="Your password"
                autoComplete="current-password"
                disabled={loading}
              />
            </label>

            <button
              type="submit"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <div className={styles.divider}>
            <span>OR</span>
          </div>

          <p className={styles.register}>
            New to ClubOps?{" "}
            <Link href="/register">
              Create your workspace
            </Link>
          </p>

          <Link
            href="/"
            className={styles.home}
          >
            ← Back to home
          </Link>
        </div>
      </section>
    </main>
  );
}