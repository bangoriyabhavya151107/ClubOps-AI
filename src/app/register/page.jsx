"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import styles from "./register.module.css";

export default function RegisterPage() {
  const router = useRouter();
  const supabase = createClient();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    department: "",
    role: "VOLUNTEER",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function update(field, value) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function handleRegister(event) {
    event.preventDefault();

    setError("");

    if (
      !form.fullName ||
      !form.email ||
      !form.password
    ) {
      setError("Please complete all required fields.");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const { data, error: signupError } =
        await supabase.auth.signUp({
          email: form.email.trim(),
          password: form.password,
          options: {
            data: {
              full_name: form.fullName.trim(),
              phone: form.phone.trim(),
              department: form.department.trim(),
              role: form.role,
            },
          },
        });

      if (signupError) {
        throw signupError;
      }

      if (!data.session) {
        alert(
          "Account created. If email confirmation is enabled, confirm your email and then login."
        );

        router.replace("/login");
        return;
      }

      router.replace("/dashboard");
      router.refresh();
    } catch (error) {
      setError(
        error?.message ||
          "Unable to create the account."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className={styles.page}>
      <div className={styles.card}>
        <Link href="/" className={styles.logo}>
          <span>C</span>
          ClubOps AI
        </Link>

        <h1>Create your workspace</h1>

        <p>
          Your role controls what you can manage inside ClubOps.
        </p>

        {error && (
          <div className={styles.error}>
            {error}
          </div>
        )}

        <form onSubmit={handleRegister}>
          <label>
            Full name *
            <input
              value={form.fullName}
              onChange={(e) =>
                update("fullName", e.target.value)
              }
              placeholder="Bhavya Patel"
            />
          </label>

          <label>
            Email *
            <input
              type="email"
              value={form.email}
              onChange={(e) =>
                update("email", e.target.value)
              }
              placeholder="you@example.com"
            />
          </label>

          <div className={styles.two}>
            <label>
              Phone
              <input
                value={form.phone}
                onChange={(e) =>
                  update("phone", e.target.value)
                }
                placeholder="+91..."
              />
            </label>

            <label>
              Department
              <input
                value={form.department}
                onChange={(e) =>
                  update("department", e.target.value)
                }
                placeholder="Computer Engineering"
              />
            </label>
          </div>

          <label>
            Role *
            <select
              value={form.role}
              onChange={(e) =>
                update("role", e.target.value)
              }
            >
              <option value="ADMIN">Admin</option>
              <option value="COORDINATOR">
                Coordinator
              </option>
              <option value="VOLUNTEER">
                Volunteer
              </option>
            </select>
          </label>

          <div className={styles.two}>
            <label>
              Password *
              <input
                type="password"
                value={form.password}
                onChange={(e) =>
                  update("password", e.target.value)
                }
              />
            </label>

            <label>
              Confirm *
              <input
                type="password"
                value={form.confirmPassword}
                onChange={(e) =>
                  update(
                    "confirmPassword",
                    e.target.value
                  )
                }
              />
            </label>
          </div>

          <button disabled={loading}>
            {loading
              ? "Creating workspace..."
              : "Create Account"}
          </button>
        </form>

        <div className={styles.footer}>
          Already registered?{" "}
          <Link href="/login">Login</Link>
        </div>
      </div>
    </main>
  );
}