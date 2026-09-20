"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import { normalizeRole } from "@/lib/clubops";

export default function ReportsPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [exporting, setExporting] = useState(false);
  const [role, setRole] = useState("COORDINATOR");

  useEffect(() => {
    load();
  }, []);

  async function load() {
    try {
      setLoading(true);
      setError("");

      const { getWorkspace } = await import("@/lib/clubops");
      const workspace = await getWorkspace();
      const userRole = normalizeRole(workspace?.role || workspace?.profile?.role || "VOLUNTEER");
      setRole(userRole);

      const supabase = (await import("@/lib/supabase/client")).createClient();

      const [
        membersRes,
        eventsRes,
        tasksRes,
        meetingsRes,
        announcementsRes,
        risksRes,
      ] = await Promise.all([
        supabase
          .from("club_members")
          .select("id", { count: "exact" })
          .eq("club_id", workspace.clubId)
          .eq("status", "active"),

        supabase
          .from("events")
          .select("id,status", { count: "exact" })
          .eq("club_id", workspace.clubId),

        supabase
          .from("tasks")
          .select("id,status,due_date")
          .eq("club_id", workspace.clubId),

        supabase
          .from("meetings")
          .select("id", { count: "exact" })
          .eq("club_id", workspace.clubId),

        supabase
          .from("announcements")
          .select("id", { count: "exact" })
          .eq("club_id", workspace.clubId),

        supabase
          .from("risks")
          .select("id,status", { count: "exact" })
          .eq("club_id", workspace.clubId),
      ]);

      const today = new Date().toISOString().split("T")[0];
      const taskRows = tasksRes.data || [];
      const eventRows = eventsRes.data || [];
      const riskRows = risksRes.data || [];

      const totalTasks = taskRows.length;
      const completedTasks = taskRows.filter((t) => t.status === "Completed").length;
      const overdueTasks = taskRows.filter(
        (t) => t.status !== "Completed" && t.due_date && t.due_date < today
      ).length;
      const inProgressTasks = taskRows.filter((t) => t.status === "In Progress").length;
      const pendingTasks = taskRows.filter((t) => t.status === "Pending").length;

      const upcomingEvents = eventRows.filter((e) => e.status === "Upcoming").length;
      const completedEvents = eventRows.filter((e) => e.status === "Completed").length;
      const openRisks = riskRows.filter((r) => r.status !== "Resolved").length;

      setData({
        members: membersRes.count || 0,
        events: eventsRes.count || 0,
        upcomingEvents,
        completedEvents,
        tasks: totalTasks,
        completedTasks,
        inProgressTasks,
        pendingTasks,
        overdueTasks,
        meetings: meetingsRes.count || 0,
        announcements: announcementsRes.count || 0,
        risks: risksRes.count || 0,
        openRisks,
        clubName: workspace?.club?.name || workspace?.profile?.full_name || "Club",
        generatedAt: new Date().toLocaleString("en-IN"),
        completionRate: totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0,
      });
    } catch (err) {
      console.error(err);
      setError(err?.message || "Unable to load reports.");
    } finally {
      setLoading(false);
    }
  }

  async function exportPDF() {
    setExporting(true);
    // Use browser print as PDF
    const printContent = document.getElementById("report-content");
    const originalTitle = document.title;
    document.title = `ClubOps Report - ${data?.clubName || "Club"} - ${data?.generatedAt}`;
    window.print();
    document.title = originalTitle;
    setExporting(false);
  }

  async function exportCSV() {
    if (!data) return;
    const rows = [
      ["Metric", "Value"],
      ["Total Members", data.members],
      ["Total Events", data.events],
      ["Upcoming Events", data.upcomingEvents],
      ["Completed Events", data.completedEvents],
      ["Total Tasks", data.tasks],
      ["Completed Tasks", data.completedTasks],
      ["In Progress Tasks", data.inProgressTasks],
      ["Pending Tasks", data.pendingTasks],
      ["Overdue Tasks", data.overdueTasks],
      ["Task Completion Rate", `${data.completionRate}%`],
      ["Meetings", data.meetings],
      ["Announcements", data.announcements],
      ["Total Risks", data.risks],
      ["Open Risks", data.openRisks],
      ["Report Generated", data.generatedAt],
    ];
    const csvContent = rows.map((r) => r.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `clubops-report-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  if (role === "VOLUNTEER") {
    return (
      <div className="clubops-dashboard">
        <Sidebar />
        <main className="clubops-main">
          <Topbar />
          <section className="clubops-content">
            <div style={{
              background: "#fff",
              border: "1px solid rgba(0,0,0,0.08)",
              borderRadius: "28px",
              padding: "4rem 2rem",
              textAlign: "center",
              maxWidth: "600px",
              margin: "4rem auto",
              boxShadow: "0 10px 30px rgba(0,0,0,0.02)"
            }}>
              <div style={{ fontSize: "2.8rem", marginBottom: "1rem" }}>🔒</div>
              <span className="eyebrow">ACCESS RESTRICTED</span>
              <h2 style={{ fontSize: "1.8rem", fontWeight: 800, margin: "0.5rem 0 1rem", color: "#111" }}>
                Leadership Access Required
              </h2>
              <p style={{ color: "rgba(17,17,17,0.6)", lineHeight: 1.6, marginBottom: "2rem" }}>
                Operations analytics and exportable reports are accessible to Coordinators and Administrators.
              </p>
              <Link href="/dashboard" className="clubops-primary-button" style={{ display: "inline-block", textDecoration: "none" }}>
                Return to Dashboard
              </Link>
            </div>
          </section>
        </main>
      </div>
    );
  }

  return (
    <div className="clubops-dashboard">
      <Sidebar />
      <main className="clubops-main">
        <Topbar />
        <section className="clubops-content" id="report-content">
          <div className="clubops-welcome">
            <div>
              <span>ANALYTICS</span>
              <h2>Operations Reports</h2>
              <p>Live metrics calculated from your club workspace.</p>
            </div>
            {!loading && data && (
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <button
                  onClick={exportCSV}
                  className="clubops-action-button"
                  style={{ background: "#10b981", color: "white", border: "none", padding: "10px 18px", borderRadius: "8px", cursor: "pointer", fontWeight: 700, fontSize: "13px", display: "flex", alignItems: "center", gap: "6px" }}
                >
                  ↓ Export CSV
                </button>
                <button
                  onClick={exportPDF}
                  disabled={exporting}
                  className="clubops-action-button"
                  style={{ background: "#4f46e5", color: "white", border: "none", padding: "10px 18px", borderRadius: "8px", cursor: "pointer", fontWeight: 700, fontSize: "13px", display: "flex", alignItems: "center", gap: "6px" }}
                >
                  🖨 Print / PDF
                </button>
              </div>
            )}
          </div>

          {loading && (
            <div className="clubops-skeleton-grid">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="clubops-skeleton-stat" />
              ))}
            </div>
          )}

          {error && (
            <div className="clubops-error-message">{error}</div>
          )}

          {!loading && data && (
            <>
              {/* Key Stats */}
              <div className="clubops-stat-grid">
                <StatCard title="Members" value={data.members} icon="♟" color="#6366f1" />
                <StatCard title="Events" value={data.events} icon="▣" color="#8b5cf6" />
                <StatCard title="Tasks" value={data.tasks} icon="☑" color="#0ea5e9" />
                <StatCard title="Meetings" value={data.meetings} icon="◫" color="#10b981" />
                <StatCard title="Announcements" value={data.announcements} icon="◈" color="#f59e0b" />
                <StatCard title="Risks" value={data.risks} icon="⚠" color="#ef4444" />
              </div>

              {/* Task Progress */}
              <section className="clubops-panel">
                <div className="clubops-panel-title">
                  <div>
                    <span>TASK ANALYTICS</span>
                    <h3>Task Completion Overview</h3>
                  </div>
                </div>
                <div style={{ padding: "0 24px 24px" }}>
                  <div className="report-progress-row">
                    <span>Completion Rate</span>
                    <div className="report-progress-bar">
                      <div className="report-progress-fill" style={{ width: `${data.completionRate}%`, background: "#6366f1" }} />
                    </div>
                    <strong>{data.completionRate}%</strong>
                  </div>
                  <div className="report-progress-row">
                    <span>Completed</span>
                    <div className="report-progress-bar">
                      <div className="report-progress-fill" style={{ width: data.tasks > 0 ? `${(data.completedTasks / data.tasks) * 100}%` : "0%", background: "#10b981" }} />
                    </div>
                    <strong>{data.completedTasks}</strong>
                  </div>
                  <div className="report-progress-row">
                    <span>In Progress</span>
                    <div className="report-progress-bar">
                      <div className="report-progress-fill" style={{ width: data.tasks > 0 ? `${(data.inProgressTasks / data.tasks) * 100}%` : "0%", background: "#f59e0b" }} />
                    </div>
                    <strong>{data.inProgressTasks}</strong>
                  </div>
                  <div className="report-progress-row">
                    <span>Overdue</span>
                    <div className="report-progress-bar">
                      <div className="report-progress-fill" style={{ width: data.tasks > 0 ? `${(data.overdueTasks / data.tasks) * 100}%` : "0%", background: "#ef4444" }} />
                    </div>
                    <strong>{data.overdueTasks}</strong>
                  </div>
                </div>
              </section>

              {/* Club Health */}
              <section className="clubops-panel">
                <div className="clubops-panel-title">
                  <div>
                    <span>CLUB HEALTH</span>
                    <h3>Operational Overview</h3>
                  </div>
                  <small style={{ color: "#64748b", fontSize: "11px" }}>Generated: {data.generatedAt}</small>
                </div>
                <div className="clubops-list">
                  <ReportRow label="Active Members" value={data.members} />
                  <ReportRow label="Total Events" value={data.events} />
                  <ReportRow label="Upcoming Events" value={data.upcomingEvents} />
                  <ReportRow label="Completed Events" value={data.completedEvents} />
                  <ReportRow label="Meetings Held" value={data.meetings} />
                  <ReportRow label="Announcements" value={data.announcements} />
                  <ReportRow label="Open Risks" value={data.openRisks} alert={data.openRisks > 0} />
                </div>
              </section>
            </>
          )}
        </section>
      </main>
    </div>
  );
}

function StatCard({ title, value, icon, color }) {
  return (
    <article className="clubops-stat">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <small>{title}</small>
        <span style={{ color, fontSize: "18px" }}>{icon}</span>
      </div>
      <strong>{value}</strong>
    </article>
  );
}

function ReportRow({ label, value, alert }) {
  return (
    <div className="clubops-list-row">
      <div><strong>{label}</strong></div>
      <span className="status-badge" style={alert ? { background: "#fef2f2", color: "#b91c1c" } : {}}>
        {value}
      </span>
    </div>
  );
}