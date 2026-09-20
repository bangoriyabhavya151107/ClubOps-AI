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

    setError("");

    if (!email.trim() || !password) {
      setError("Enter your email and password.");
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
        throw loginError;
      }

      if (!data?.user) {
        throw new Error("Login failed.");
      }

      const { data: workspace, error: workspaceError } =
        await supabase.rpc("ensure_user_workspace");

      if (workspaceError) {
        console.error(workspaceError);

        throw new Error(
          workspaceError.message ||
            "Your account could not be connected to a workspace."
        );
      }

      if (!workspace?.club?.id) {
        throw new Error(
          "Your account does not have a club workspace yet."
        );
      }

      router.replace("/dashboard");
      router.refresh();
    } catch (error) {
      console.error(error);

      setError(
        error?.message ||
          "Unable to login. Please check your credentials."
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
            Events, volunteers, tasks, meetings,
            budgets, risks and AI assistance in one
            intelligent workspace.
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
            <div className={styles.error}>
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
              {loading
                ? "Opening workspace..."
                : "Sign in"}
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