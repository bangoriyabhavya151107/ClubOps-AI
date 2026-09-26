"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  Eye,
  EyeOff,
  CheckCircle2,
  XCircle,
  Crown,
  Zap,
  HeartHandshake,
  ArrowRight,
} from "lucide-react";
import styles from "./register.module.css";

const ROLES = [
  {
    id: "ADMIN",
    title: "Club Admin",
    icon: Crown,
    color: "#a855f7",
    desc: "Full permissions: events, finance, members, reports & risks",
  },
  {
    id: "COORDINATOR",
    title: "Coordinator",
    icon: Zap,
    color: "#6366f1",
    desc: "Manage events, track attendance, tasks & announcements",
  },
  {
    id: "VOLUNTEER",
    title: "Volunteer",
    icon: HeartHandshake,
    color: "#10b981",
    desc: "View event schedules, execute tasks & join activities",
  },
];

export default function RegisterPage() {
  const router = useRouter();
  const supabase = createClient();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    department: "",
    role: "ADMIN", // default to Admin so new users have immediate full access
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  function update(field, value) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function getPasswordStrength(pwd) {
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    return score;
  }

  const passwordStrength = getPasswordStrength(form.password);
  const strengthLabels = ["", "Weak", "Fair", "Good", "Strong"];
  const strengthColors = ["", "#ef4444", "#f59e0b", "#10b981", "#6366f1"];

  const passwordsMatch =
    form.password && form.confirmPassword && form.password === form.confirmPassword;
  const passwordsMismatch =
    form.password && form.confirmPassword && form.password !== form.confirmPassword;

  async function handleRegister(event) {
    event.preventDefault();
    setError("");

    if (!form.fullName || !form.email || !form.password) {
      setError("Please fill in all required fields.");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const { data, error: signupError } = await supabase.auth.signUp({
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

      if (signupError) throw signupError;

      // Ensure profile and role are updated in database
      if (data?.user?.id) {
        try {
          await supabase.from("profiles").upsert({
            id: data.user.id,
            full_name: form.fullName.trim(),
            phone: form.phone.trim(),
            department: form.department.trim(),
            role: form.role,
          });
        } catch (e) {
          console.warn("Profile update notice:", e);
        }
      }

      if (!data?.session) {
        router.replace("/login?registered=1");
        return;
      }

      router.replace("/dashboard");
      router.refresh();
    } catch (err) {
      setError(err?.message || "Unable to create your account.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className={styles.page}>
      {/* Brand Panel */}
      <section className={styles.brandPanel}>
        <div className={styles.brand}>
          <div className={styles.logo}><span>C</span></div>
          <div>
            <strong>ClubOps AI</strong>
            <span>Next-Gen Club Management</span>
          </div>
        </div>

        <div className={styles.brandContent}>
          <span className={styles.badge}>MULTI-ROLE WORKSPACE</span>

          <h1>
            Empower your team.
            <br />
            <span>Lead with precision.</span>
          </h1>

          <p>
            Choose your role and get tailored operational tools. Manage events,
            finances, members, attendance and AI intelligence in one synchronized system.
          </p>

          <div className={styles.features}>
            <div>👑 Admin: Full governance, budgets, risks & analytics</div>
            <div>⚡ Coordinator: Event operations, attendance & tasks</div>
            <div>🤝 Volunteer: Member schedules, assignments & activities</div>
          </div>
        </div>
      </section>

      {/* Form Panel */}
      <section className={styles.formPanel}>
        <div className={styles.card}>
          <Link href="/" className={styles.backLink}>← Back to home</Link>

          <span className={styles.smallLabel}>CREATE ACCOUNT</span>
          <h2>Join your workspace</h2>
          <p className={styles.subtitle}>Select your operational role and enter your details.</p>

          {error && (
            <div className={styles.error} role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleRegister}>
            {/* Role Selection Tabs */}
            <div className="role-selector-container" style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", fontSize: "11px", fontWeight: 700, marginBottom: "8px", color: "#374151" }}>
                Select Your Role *
              </label>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px" }}>
                {ROLES.map((r) => {
                  const Icon = r.icon;
                  const active = form.role === r.id;
                  return (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => update("role", r.id)}
                      style={{
                        padding: "10px 8px",
                        borderRadius: "10px",
                        border: active ? `2px solid ${r.color}` : "1px solid #e2e8f0",
                        background: active ? `${r.color}15` : "#f8fafc",
                        cursor: "pointer",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "5px",
                        transition: "all 0.2s ease",
                      }}
                    >
                      <Icon size={18} color={r.color} />
                      <strong style={{ fontSize: "12px", color: active ? r.color : "#1f2937" }}>
                        {r.title}
                      </strong>
                    </button>
                  );
                })}
              </div>
              <p style={{ margin: "6px 0 0", fontSize: "11px", color: "#64748b" }}>
                {ROLES.find((r) => r.id === form.role)?.desc}
              </p>
            </div>

            <label>
              Full name *
              <input
                value={form.fullName}
                onChange={(e) => update("fullName", e.target.value)}
                placeholder="e.g. Alex Morgan"
                disabled={loading}
                autoFocus
              />
            </label>

            <label>
              Email address *
              <input
                type="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                placeholder="you@university.edu"
                disabled={loading}
              />
            </label>

            <div className={styles.two}>
              <label>
                Phone
                <input
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  placeholder="+91..."
                  disabled={loading}
                />
              </label>

              <label>
                Department / Branch
                <input
                  value={form.department}
                  onChange={(e) => update("department", e.target.value)}
                  placeholder="Computer Science"
                  disabled={loading}
                />
              </label>
            </div>

            <div className={styles.two}>
              <label>
                Password *
                <div className={styles.inputWrap}>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={(e) => update("password", e.target.value)}
                    placeholder="Min. 6 characters"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    className={styles.eyeBtn}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {form.password && (
                  <div className={styles.strengthBar}>
                    <div
                      className={styles.strengthFill}
                      style={{
                        width: `${(passwordStrength / 4) * 100}%`,
                        background: strengthColors[passwordStrength],
                      }}
                    />
                  </div>
                )}
                {form.password && (
                  <span className={styles.strengthLabel} style={{ color: strengthColors[passwordStrength] }}>
                    {strengthLabels[passwordStrength]}
                  </span>
                )}
              </label>

              <label>
                Confirm password *
                <div className={styles.inputWrap}>
                  <input
                    type={showConfirm ? "text" : "password"}
                    value={form.confirmPassword}
                    onChange={(e) => update("confirmPassword", e.target.value)}
                    placeholder="Repeat password"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    className={styles.eyeBtn}
                    onClick={() => setShowConfirm(!showConfirm)}
                  >
                    {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {passwordsMatch && (
                  <span className={styles.matchIcon}><CheckCircle2 size={14} color="#10b981" /> Passwords match</span>
                )}
                {passwordsMismatch && (
                  <span className={styles.mismatchIcon}><XCircle size={14} color="#ef4444" /> Passwords don't match</span>
                )}
              </label>
            </div>

            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading && <span className={styles.spinner} />}
              {loading ? "Creating your workspace..." : "Create Account"}
              <ArrowRight size={16} />
            </button>
          </form>

          <div className={styles.footer}>
            Already registered?{" "}
            <Link href="/login">Sign in to your workspace</Link>
          </div>
        </div>
      </section>
    </main>
  );
}