"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Topbar from "@/components/layout/Topbar";
import { getWorkspace, normalizeRole } from "@/lib/clubops";
import { Bell, Shield, Sliders, Check, Globe, Sparkles, Building, Calendar, CheckSquare, Megaphone, Video, FileText, ClipboardCheck } from "lucide-react";

export default function SettingsPage() {
  const [workspace, setWorkspace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  const [settings, setSettings] = useState({
    emailAlerts: true,
    eventReminders: true,
    taskAssignments: true,
    announcements: true,
    aiSuggestions: true,
  });

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const ws = await getWorkspace();
        if (mounted) setWorkspace(ws);
      } catch (err) {
        console.warn("Settings workspace load error:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();

    // Load local stored preferences if available
    try {
      const savedPref = localStorage.getItem("clubops_settings");
      if (savedPref) {
        setSettings(JSON.parse(savedPref));
      }
    } catch (_) {}

    return () => { mounted = false; };
  }, []);

  function toggle(key) {
    setSettings((cur) => {
      const next = { ...cur, [key]: !cur[key] };
      try {
        localStorage.setItem("clubops_settings", JSON.stringify(next));
      } catch (_) {}
      return next;
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  const role = normalizeRole(workspace?.role || workspace?.profile?.role || "VOLUNTEER");
  const clubName = workspace?.club?.name || "Campus Club Workspace";

  return (
    <div className="clubops-dashboard">
      <main className="clubops-main">
        <Topbar />

        <section className="clubops-content" style={{ maxWidth: "1000px", margin: "0 auto" }}>
          {/* Header */}
          <div style={{ marginBottom: "3rem", paddingBottom: "1.5rem", borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
            <span className="eyebrow">PREFERENCES & CONFIGURATION</span>
            <h1 style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 800, letterSpacing: "-0.06em", margin: "0 0 0.5rem", color: "#111" }}>
              Workspace Settings.
            </h1>
            <p style={{ margin: 0, fontSize: "1.05rem", color: "rgba(17,17,17,0.6)" }}>
              Customize notification alerts, operations dispatching, and view workspace connectivity.
            </p>
          </div>

          {saved && (
            <div style={{
              padding: "1rem 1.5rem",
              borderRadius: "16px",
              background: "rgba(16,185,129,0.1)",
              color: "#047857",
              fontSize: "0.92rem",
              fontWeight: 600,
              marginBottom: "2rem",
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
              border: "1px solid rgba(16,185,129,0.2)"
            }}>
              <Check size={18} /> Settings preferences saved successfully.
            </div>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
            {/* Notifications Card */}
            <div style={{
              background: "#fff",
              border: "1px solid rgba(0,0,0,0.08)",
              borderRadius: "28px",
              padding: "2.5rem",
              boxShadow: "0 10px 30px rgba(0,0,0,0.02)"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
                <Bell size={20} />
                <h2 style={{ fontSize: "1.4rem", fontWeight: 800, letterSpacing: "-0.04em", margin: 0, color: "#111" }}>
                  Operational Notifications
                </h2>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
                {[
                  { key: "emailAlerts", title: "Email Notifications", desc: "Receive immediate email alerts for critical club announcements and schedule updates." },
                  { key: "eventReminders", title: "Event Reminders", desc: "Get 24-hour and 1-hour pre-event reminder broadcasts." },
                  { key: "taskAssignments", title: "Task Assignments & Deadlines", desc: "Receive alerts when tasks are assigned to you or marked as completed." },
                  { key: "announcements", title: "Executive Announcements", desc: "Push notices when leadership posts new club circulars." },
                  { key: "aiSuggestions", title: "AI Copilot Suggestions", desc: "Receive automated recommendations for risk mitigation and task delegation." },
                ].map((item) => (
                  <div
                    key={item.key}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "1.2rem 0",
                      borderBottom: "1px solid rgba(0,0,0,0.06)"
                    }}
                  >
                    <div style={{ maxWidth: "80%" }}>
                      <strong style={{ display: "block", fontSize: "0.98rem", color: "#111", marginBottom: "0.2rem" }}>
                        {item.title}
                      </strong>
                      <span style={{ fontSize: "0.85rem", color: "rgba(17,17,17,0.55)", lineHeight: 1.4, display: "block" }}>
                        {item.desc}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggle(item.key)}
                      style={{
                        width: "52px",
                        height: "28px",
                        borderRadius: "999px",
                        background: settings[item.key] ? "#111" : "rgba(0,0,0,0.15)",
                        position: "relative",
                        border: 0,
                        cursor: "pointer",
                        transition: "background 0.2s ease"
                      }}
                      aria-pressed={settings[item.key]}
                    >
                      <span
                        style={{
                          width: "22px",
                          height: "22px",
                          borderRadius: "50%",
                          background: "#fff",
                          position: "absolute",
                          top: "3px",
                          left: settings[item.key] ? "27px" : "3px",
                          transition: "left 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                          boxShadow: "0 2px 5px rgba(0,0,0,0.2)"
                        }}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Workspace Architecture Details */}
            <div style={{
              background: "#fff",
              border: "1px solid rgba(0,0,0,0.08)",
              borderRadius: "28px",
              padding: "2.5rem",
              boxShadow: "0 10px 30px rgba(0,0,0,0.02)"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
                <Building size={20} />
                <h2 style={{ fontSize: "1.4rem", fontWeight: 800, letterSpacing: "-0.04em", margin: 0, color: "#111" }}>
                  Workspace Architecture
                </h2>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
                <div style={{ borderTop: "1px solid rgba(0,0,0,0.15)", paddingTop: "1rem" }}>
                  <span style={{ fontSize: "0.68rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(17,17,17,0.45)", display: "block" }}>
                    CLUB ORGANIZATION
                  </span>
                  <strong style={{ fontSize: "1.3rem", display: "block", marginTop: "0.4rem", color: "#111" }}>
                    {clubName}
                  </strong>
                  <small style={{ color: "rgba(17,17,17,0.5)" }}>Connected via Supabase</small>
                </div>

                <div style={{ borderTop: "1px solid rgba(0,0,0,0.15)", paddingTop: "1rem" }}>
                  <span style={{ fontSize: "0.68rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(17,17,17,0.45)", display: "block" }}>
                    CURRENT ACCESS LEVEL
                  </span>
                  <strong style={{ fontSize: "1.3rem", display: "block", marginTop: "0.4rem", color: "#111" }}>
                    {role}
                  </strong>
                  <small style={{ color: "rgba(17,17,17,0.5)" }}>Role-based security active</small>
                </div>

                <div style={{ borderTop: "1px solid rgba(0,0,0,0.15)", paddingTop: "1rem" }}>
                  <span style={{ fontSize: "0.68rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(17,17,17,0.45)", display: "block" }}>
                    AI ACCELERATION ENGINE
                  </span>
                  <strong style={{ fontSize: "1.3rem", display: "block", marginTop: "0.4rem", color: "#111" }}>
                    Gemini 3.6 Flash
                  </strong>
                  <small style={{ color: "rgba(17,17,17,0.5)" }}>Google GenAI active</small>
                </div>

                <div style={{ borderTop: "1px solid rgba(0,0,0,0.15)", paddingTop: "1rem" }}>
                  <span style={{ fontSize: "0.68rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(17,17,17,0.45)", display: "block" }}>
                    DATABASE REPOSITORY
                  </span>
                  <strong style={{ fontSize: "1.3rem", display: "block", marginTop: "0.4rem", color: "#111" }}>
                    Supabase PostgreSQL
                  </strong>
                  <small style={{ color: "rgba(17,17,17,0.5)" }}>RLS encryption enabled</small>
                </div>
              </div>
            </div>

            {/* Operational Modules Hub */}
            <div style={{
              background: "#fff",
              border: "1px solid rgba(0,0,0,0.08)",
              borderRadius: "28px",
              padding: "2.5rem",
              boxShadow: "0 10px 30px rgba(0,0,0,0.02)"
            }}>
              <div style={{ marginBottom: "1.5rem" }}>
                <span className="eyebrow">OPERATIONAL ACCESS</span>
                <h2 style={{ fontSize: "1.4rem", fontWeight: 800, letterSpacing: "-0.04em", margin: "0.2rem 0 0.4rem", color: "#111" }}>
                  Core Operational Modules
                </h2>
                <p style={{ margin: 0, fontSize: "0.9rem", color: "rgba(17,17,17,0.6)" }}>
                  Direct access to manage events, assignments, announcements, attendance, and knowledge base.
                </p>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1rem" }}>
                {[
                  { title: "Events & Schedules", href: "/events", icon: Calendar, desc: "Create, view and organize club activities" },
                  { title: "Task Assignments", href: "/tasks", icon: CheckSquare, desc: "Assign volunteers and track deadlines" },
                  { title: "Executive Circulars", href: "/announcements", icon: Megaphone, desc: "Publish urgent notices & club updates" },
                  { title: "Meeting Dispatch", href: "/meetings", icon: Video, desc: "Schedule core coordination calls" },
                  { title: "Document Vault", href: "/documents", icon: FileText, desc: "Repository for guidelines & records" },
                  { title: "Attendance Roster", href: "/attendance", icon: ClipboardCheck, desc: "Record member participation" },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      style={{
                        padding: "1.2rem",
                        borderRadius: "18px",
                        border: "1px solid rgba(0,0,0,0.08)",
                        background: "#fafaf8",
                        textDecoration: "none",
                        color: "#111",
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.4rem",
                        transition: "all 0.15s ease",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                        <Icon size={18} color="#111" />
                        <strong style={{ fontSize: "0.95rem" }}>{item.title}</strong>
                      </div>
                      <span style={{ fontSize: "0.8rem", color: "rgba(17,17,17,0.55)" }}>
                        {item.desc}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
