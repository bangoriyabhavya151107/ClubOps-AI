"use client";

import { useState } from "react";
import Topbar from "@/components/layout/Topbar";
import { Sparkles, Send, Copy, Check, RefreshCw, Calendar, ListTodo, ShieldAlert, Users, Megaphone, Coins } from "lucide-react";

const TEMPLATES = [
  {
    icon: Calendar,
    title: "Event Master Plan",
    category: "Planning",
    prompt: "Create a complete, end-to-end event execution plan for a college tech symposium with 250 attendees. Include timeline, volunteer roles, materials checklist, and schedule breakdown.",
  },
  {
    icon: ListTodo,
    title: "Task Breakdown",
    category: "Delegation",
    prompt: "Break down organizing our annual cultural fest into actionable tasks with assigned roles (Coordinator, Volunteer, Tech Lead), priorities, deadlines, and dependencies.",
  },
  {
    icon: ShieldAlert,
    title: "Risk Assessment",
    category: "Safety",
    prompt: "Generate a comprehensive risk register for an outdoor campus hackathon. Include probability, severity, preventive measures, and emergency contingency steps.",
  },
  {
    icon: Megaphone,
    title: "Campus Announcement",
    category: "Outreach",
    prompt: "Write an inspiring, engaging campus announcement calling for student volunteers to join the upcoming robotics championship organizing committee.",
  },
  {
    icon: Coins,
    title: "Budget Optimization",
    category: "Finance",
    prompt: "Draft a practical budget allocation for a 2-day student workshop with INR 40,000 total funds, including venue setup, refreshments, prizes, and reserve contingency.",
  },
  {
    icon: Users,
    title: "Meeting Agenda",
    category: "Coordination",
    prompt: "Draft a tight 45-minute club executive meeting agenda covering budget review, event milestone check, volunteer assignments, and immediate action items.",
  },
];

export default function AIAssistantPage() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  async function handleAsk(promptToAsk = input) {
    const clean = promptToAsk.trim();
    if (!clean) return;

    setLoading(true);
    setError("");
    setResponse("");

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: clean }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to generate AI response.");
      }

      setResponse(data.text);
    } catch (err) {
      console.error("AI error:", err);
      setError(err?.message || "AI assistant is temporarily unavailable.");
    } finally {
      setLoading(false);
    }
  }

  function handleCopy() {
    if (!response) return;
    navigator.clipboard.writeText(response);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="clubops-dashboard">
      <main className="clubops-main">
        <Topbar />

        <section className="clubops-content">
          {/* Header */}
          <div style={{ marginBottom: "2.5rem", paddingBottom: "1.5rem", borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
            <span className="eyebrow">INTELLIGENT COPILOT</span>
            <h1 style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", fontWeight: 800, letterSpacing: "-0.06em", margin: "0 0 0.5rem", color: "#111" }}>
              ClubOps Intelligence.
            </h1>
            <p style={{ margin: 0, fontSize: "1.05rem", color: "rgba(17,17,17,0.6)", maxWidth: "600px" }}>
              Accelerate event planning, delegate volunteer workloads, draft announcements, and analyze operational risks in seconds.
            </p>
          </div>

          {/* Quick Preset Templates */}
          <div style={{ marginBottom: "2.5rem" }}>
            <span style={{ fontSize: "0.72rem", fontWeight: 750, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(17,17,17,0.45)", display: "block", marginBottom: "1rem" }}>
              QUICK LAUNCH TEMPLATES
            </span>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1rem" }}>
              {TEMPLATES.map((tmpl) => {
                const Icon = tmpl.icon;
                return (
                  <button
                    key={tmpl.title}
                    type="button"
                    onClick={() => {
                      setInput(tmpl.prompt);
                      handleAsk(tmpl.prompt);
                    }}
                    style={{
                      padding: "1.2rem 1.4rem",
                      borderRadius: "20px",
                      background: "#ffffff",
                      border: "1px solid rgba(0,0,0,0.08)",
                      textAlign: "left",
                      cursor: "pointer",
                      display: "flex",
                      flexDirection: "column",
                      gap: "6px",
                      boxShadow: "0 8px 24px rgba(0,0,0,0.03)",
                      transition: "transform 0.2s ease, border-color 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-3px)";
                      e.currentTarget.style.borderColor = "#111";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.borderColor = "rgba(0,0,0,0.08)";
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <Icon size={18} color="#111" />
                      <span style={{ fontSize: "0.68rem", fontWeight: 750, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(17,17,17,0.45)" }}>
                        {tmpl.category}
                      </span>
                    </div>
                    <strong style={{ fontSize: "1rem", fontWeight: 750, color: "#111" }}>
                      {tmpl.title}
                    </strong>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interactive Prompt Box */}
          <div style={{ background: "#ffffff", borderRadius: "28px", padding: "2rem", border: "1px solid rgba(0,0,0,0.08)", boxShadow: "0 15px 45px rgba(0,0,0,0.04)", marginBottom: "2.5rem" }}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAsk();
              }}
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask ClubOps AI to plan an event, generate a task list, draft a budget breakdown, or assess venue risks..."
                rows={3}
                style={{
                  width: "100%",
                  padding: "1.1rem 1.3rem",
                  borderRadius: "16px",
                  border: "1px solid rgba(0,0,0,0.12)",
                  fontSize: "1rem",
                  color: "#111",
                  resize: "vertical",
                  outline: "none",
                  fontFamily: "inherit",
                }}
              />

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: "0.8rem", color: "rgba(17,17,17,0.45)" }}>
                  Powered by Gemini 3.5 Intelligence
                </span>

                <div style={{ display: "flex", gap: "10px" }}>
                  {response && (
                    <button
                      type="button"
                      onClick={() => {
                        setInput("");
                        setResponse("");
                        setError("");
                      }}
                      style={{
                        padding: "0.75rem 1.2rem",
                        borderRadius: "999px",
                        background: "transparent",
                        border: "1px solid rgba(0,0,0,0.14)",
                        fontSize: "0.85rem",
                        fontWeight: 650,
                        cursor: "pointer",
                      }}
                    >
                      Clear
                    </button>
                  )}

                  <button
                    type="submit"
                    disabled={loading || !input.trim()}
                    className="button-primary"
                    style={{ opacity: loading || !input.trim() ? 0.6 : 1 }}
                  >
                    {loading ? (
                      <>
                        <RefreshCw size={15} className="spin" style={{ animation: "spin 1s linear infinite" }} />
                        <span>Generating...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles size={15} />
                        <span>Generate with AI</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Error Message */}
          {error && (
            <div style={{ padding: "1.2rem 1.6rem", borderRadius: "16px", background: "#fef2f2", border: "1px solid #fecaca", color: "#dc2626", marginBottom: "2rem", fontSize: "0.92rem" }}>
              {error}
            </div>
          )}

          {/* AI Response Output */}
          {response && (
            <div style={{ background: "#ffffff", borderRadius: "28px", padding: "2.5rem", border: "1px solid rgba(0,0,0,0.08)", boxShadow: "0 20px 50px rgba(0,0,0,0.05)" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.8rem", paddingBottom: "1.2rem", borderBottom: "1px solid rgba(0,0,0,0.07)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <Sparkles size={18} color="#4f46e5" />
                  <strong style={{ fontSize: "1.1rem", fontWeight: 800, color: "#111" }}>Generated Plan</strong>
                </div>

                <button
                  type="button"
                  onClick={handleCopy}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "0.6rem 1.1rem",
                    borderRadius: "999px",
                    background: copied ? "#ecfdf5" : "#f5f4ef",
                    border: "1px solid rgba(0,0,0,0.08)",
                    fontSize: "0.82rem",
                    fontWeight: 700,
                    color: copied ? "#059669" : "#111",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  {copied ? <Check size={13} /> : <Copy size={13} />}
                  <span>{copied ? "Copied!" : "Copy Text"}</span>
                </button>
              </div>

              <div
                style={{
                  fontSize: "1rem",
                  lineHeight: 1.8,
                  color: "#1f2937",
                  whiteSpace: "pre-wrap",
                  fontFamily: "inherit",
                }}
              >
                {response}
              </div>
            </div>
          )}
        </section>
      </main>

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}