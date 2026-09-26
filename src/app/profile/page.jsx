"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Topbar from "@/components/layout/Topbar";
import { getWorkspace, normalizeRole, initials } from "@/lib/clubops";
import { Crown, Zap, HeartHandshake, ShieldCheck, Mail, Phone, Building, Check, Loader2 } from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const [workspace, setWorkspace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    department: "",
    bio: "",
    role: "VOLUNTEER",
  });

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const ws = await getWorkspace();
        if (!mounted) return;
        setWorkspace(ws);

        const prof = ws?.profile || {};
        const safeRole = normalizeRole(prof?.role || ws?.membership?.role || ws?.role || "VOLUNTEER");

        setForm({
          fullName: prof.full_name || ws?.user?.user_metadata?.full_name || "",
          email: ws?.user?.email || prof.email || "",
          phone: prof.phone || "",
          department: prof.department || "",
          bio: prof.bio || "",
          role: safeRole,
        });
      } catch (err) {
        console.error("Profile load error:", err);
        if (mounted) setError(err?.message || "Unable to load profile.");
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => { mounted = false; };
  }, []);

  function update(field, value) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
    setSaved(false);
    setError("");
  }

  async function save(event) {
    event.preventDefault();
    if (!workspace?.user?.id) return;

    setSaving(true);
    setSaved(false);
    setError("");

    try {
      const supabase = (await import("@/lib/supabase/client")).createClient();

      const updateData = {
        full_name: form.fullName.trim(),
        phone: form.phone.trim(),
        department: form.department.trim(),
        bio: form.bio.trim(),
      };
      if (form.role) {
        updateData.role = form.role;
      }

      const { error: updateError } = await supabase
        .from("profiles")
        .update(updateData)
        .eq("id", workspace.user.id);

      if (updateError) throw updateError;

      setSaved(true);
      router.refresh();
      setTimeout(() => setSaved(false), 4000);
    } catch (err) {
      console.error("Profile save error:", err);
      setError(err?.message || "Unable to save profile changes.");
    } finally {
      setSaving(false);
    }
  }

  const role = normalizeRole(form.role);

  return (
    <div className="clubops-dashboard">
      <main className="clubops-main">
        <Topbar />

        <section className="clubops-content" style={{ maxWidth: "1200px", margin: "0 auto" }}>
          {/* Header */}
          <div style={{ marginBottom: "3rem", paddingBottom: "1.5rem", borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
            <span className="eyebrow">MEMBER PROFILE</span>
            <h1 style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 800, letterSpacing: "-0.06em", margin: "0 0 0.5rem", color: "#111" }}>
              Personal Details.
            </h1>
            <p style={{ margin: 0, fontSize: "1.05rem", color: "rgba(17,17,17,0.6)" }}>
              Manage your personal identity and contact information within your club workspace.
            </p>
          </div>

          {loading ? (
            <div style={{ padding: "4rem", textAlign: "center", color: "rgba(17,17,17,0.5)" }}>
              <Loader2 size={32} className="animate-spin" style={{ margin: "0 auto 1rem" }} />
              <p>Loading your profile details...</p>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "320px 1fr", gap: "2.5rem", alignItems: "start" }}>
              {/* Left Identity Card */}
              <aside style={{
                background: "#fff",
                border: "1px solid rgba(0,0,0,0.08)",
                borderRadius: "28px",
                padding: "2.5rem 2rem",
                textAlign: "center",
                boxShadow: "0 10px 30px rgba(0,0,0,0.02)"
              }}>
                <div style={{
                  width: "90px",
                  height: "90px",
                  borderRadius: "50%",
                  background: "#111",
                  color: "#fff",
                  fontSize: "2rem",
                  fontWeight: 800,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1.5rem",
                  letterSpacing: "-0.04em"
                }}>
                  {initials(form.fullName || "Club Member")}
                </div>

                <h2 style={{ fontSize: "1.4rem", fontWeight: 800, letterSpacing: "-0.04em", margin: "0 0 0.3rem", color: "#111" }}>
                  {form.fullName || "Club Member"}
                </h2>

                <p style={{ fontSize: "0.85rem", color: "rgba(17,17,17,0.5)", margin: "0 0 1.5rem" }}>
                  {form.email}
                </p>

                {/* Read-Only Verified Role Badge */}
                <div style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.45rem 1.2rem",
                  borderRadius: "999px",
                  fontSize: "0.75rem",
                  fontWeight: 750,
                  letterSpacing: "0.08em",
                  background: role === "ADMIN" ? "rgba(168,85,247,0.1)" : role === "COORDINATOR" ? "rgba(99,102,241,0.1)" : "rgba(16,185,129,0.1)",
                  color: role === "ADMIN" ? "#7e22ce" : role === "COORDINATOR" ? "#4f46e5" : "#047857",
                  border: "1px solid currentColor",
                  marginBottom: "1.5rem"
                }}>
                  {role === "ADMIN" && <Crown size={14} />}
                  {role === "COORDINATOR" && <Zap size={14} />}
                  {role === "VOLUNTEER" && <HeartHandshake size={14} />}
                  <span>{role}</span>
                </div>

                <div style={{
                  background: "rgba(0,0,0,0.03)",
                  borderRadius: "16px",
                  padding: "1rem",
                  fontSize: "0.78rem",
                  color: "rgba(17,17,17,0.6)",
                  lineHeight: 1.5,
                  textAlign: "left"
                }}>
                  <strong style={{ display: "block", color: "#111", marginBottom: "0.2rem" }}>
                    🔒 Role Assignment
                  </strong>
                  Your role is verified and managed by club administrators. Volunteers and coordinators cannot self-promote.
                </div>
              </aside>

              {/* Right Form Card */}
              <section style={{
                background: "#fff",
                border: "1px solid rgba(0,0,0,0.08)",
                borderRadius: "28px",
                padding: "2.5rem 3rem",
                boxShadow: "0 10px 30px rgba(0,0,0,0.02)"
              }}>
                <div style={{ marginBottom: "2rem" }}>
                  <span className="eyebrow" style={{ fontSize: "0.68rem" }}>WORKSPACE PROFILE</span>
                  <h3 style={{ fontSize: "1.6rem", fontWeight: 800, letterSpacing: "-0.04em", margin: "0.2rem 0 0", color: "#111" }}>
                    Edit Profile Information
                  </h3>
                </div>

                {error && (
                  <div style={{
                    padding: "1rem",
                    borderRadius: "14px",
                    background: "rgba(220,38,38,0.08)",
                    color: "#dc2626",
                    fontSize: "0.88rem",
                    marginBottom: "1.5rem"
                  }}>
                    {error}
                  </div>
                )}

                {saved && (
                  <div style={{
                    padding: "1rem",
                    borderRadius: "14px",
                    background: "rgba(16,185,129,0.1)",
                    color: "#047857",
                    fontSize: "0.88rem",
                    marginBottom: "1.5rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem"
                  }}>
                    <Check size={16} /> Profile changes saved to live database.
                  </div>
                )}

                <form onSubmit={save} style={{ display: "flex", flexDirection: "column", gap: "1.4rem" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.2rem" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.04em", color: "rgba(17,17,17,0.7)", marginBottom: "0.4rem" }}>
                        FULL NAME *
                      </label>
                      <input
                        type="text"
                        value={form.fullName}
                        onChange={(e) => update("fullName", e.target.value)}
                        placeholder="Your full name"
                        required
                        style={{
                          width: "100%",
                          padding: "0.85rem 1.1rem",
                          borderRadius: "12px",
                          border: "1px solid rgba(0,0,0,0.15)",
                          background: "#fafaf8",
                          fontSize: "0.92rem",
                          color: "#111"
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.04em", color: "rgba(17,17,17,0.7)", marginBottom: "0.4rem" }}>
                        EMAIL ADDRESS (LOCKED)
                      </label>
                      <input
                        type="email"
                        value={form.email}
                        disabled
                        style={{
                          width: "100%",
                          padding: "0.85rem 1.1rem",
                          borderRadius: "12px",
                          border: "1px solid rgba(0,0,0,0.1)",
                          background: "rgba(0,0,0,0.04)",
                          fontSize: "0.92rem",
                          color: "rgba(17,17,17,0.5)",
                          cursor: "not-allowed"
                        }}
                      />
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.2rem" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.04em", color: "rgba(17,17,17,0.7)", marginBottom: "0.4rem" }}>
                        PHONE NUMBER
                      </label>
                      <input
                        type="text"
                        value={form.phone}
                        onChange={(e) => update("phone", e.target.value)}
                        placeholder="+91 98765 43210"
                        style={{
                          width: "100%",
                          padding: "0.85rem 1.1rem",
                          borderRadius: "12px",
                          border: "1px solid rgba(0,0,0,0.15)",
                          background: "#fafaf8",
                          fontSize: "0.92rem",
                          color: "#111"
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.04em", color: "rgba(17,17,17,0.7)", marginBottom: "0.4rem" }}>
                        DEPARTMENT / BRANCH
                      </label>
                      <input
                        type="text"
                        value={form.department}
                        onChange={(e) => update("department", e.target.value)}
                        placeholder="Computer Engineering"
                        style={{
                          width: "100%",
                          padding: "0.85rem 1.1rem",
                          borderRadius: "12px",
                          border: "1px solid rgba(0,0,0,0.15)",
                          background: "#fafaf8",
                          fontSize: "0.92rem",
                          color: "#111"
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.04em", color: "rgba(17,17,17,0.7)", marginBottom: "0.5rem" }}>
                      OPERATIONAL ROLE & WORKSPACE LEVEL
                    </label>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.75rem", marginBottom: "0.5rem" }}>
                      {[
                        { id: "ADMIN", title: "Admin", desc: "Full executive control" },
                        { id: "COORDINATOR", title: "Coordinator", desc: "Operations & planning" },
                        { id: "VOLUNTEER", title: "Volunteer", desc: "Events & tasks member" },
                      ].map((item) => {
                        const isSelected = role === item.id;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => update("role", item.id)}
                            style={{
                              padding: "0.85rem 1rem",
                              borderRadius: "14px",
                              border: isSelected ? "2px solid #111" : "1px solid rgba(0,0,0,0.12)",
                              background: isSelected ? "#111" : "#fafaf8",
                              color: isSelected ? "#fff" : "#111",
                              textAlign: "left",
                              cursor: "pointer",
                              transition: "all 0.15s ease",
                            }}
                          >
                            <div style={{ fontWeight: 750, fontSize: "0.9rem", marginBottom: "0.2rem" }}>
                              {item.title}
                            </div>
                            <div style={{ fontSize: "0.72rem", opacity: isSelected ? 0.8 : 0.6 }}>
                              {item.desc}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                    <span style={{ fontSize: "0.76rem", color: "rgba(17,17,17,0.5)" }}>
                      Choose your role and click Save below to switch workspace permissions.
                    </span>
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.04em", color: "rgba(17,17,17,0.7)", marginBottom: "0.4rem" }}>
                      BIO / ABOUT YOU
                    </label>
                    <textarea
                      value={form.bio}
                      onChange={(e) => update("bio", e.target.value)}
                      placeholder="Share your interests, club responsibilities, or technical skills..."
                      rows={4}
                      style={{
                        width: "100%",
                        padding: "0.85rem 1.1rem",
                        borderRadius: "12px",
                        border: "1px solid rgba(0,0,0,0.15)",
                        background: "#fafaf8",
                        fontSize: "0.92rem",
                        color: "#111",
                        resize: "vertical",
                        fontFamily: "inherit"
                      }}
                    />
                  </div>

                  <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "1rem" }}>
                    <button
                      type="submit"
                      disabled={saving}
                      style={{
                        padding: "0.85rem 2rem",
                        borderRadius: "999px",
                        border: 0,
                        background: "#111",
                        color: "#fff",
                        fontWeight: 700,
                        fontSize: "0.92rem",
                        cursor: saving ? "not-allowed" : "pointer",
                        boxShadow: "0 10px 25px rgba(0,0,0,0.12)",
                        transition: "all 0.2s ease",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.5rem"
                      }}
                    >
                      {saving && <Loader2 size={16} className="animate-spin" />}
                      {saving ? "Saving Changes..." : "Save Profile Details"}
                    </button>
                  </div>
                </form>
              </section>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
