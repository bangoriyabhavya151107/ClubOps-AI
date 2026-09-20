"use client";

import { useEffect, useState } from "react";

import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";

export default function ReportsPage() {
  const [data, setData] = useState({
    members: 0,
    events: 0,
    tasks: 0,
    completed: 0,
    overdue: 0,
    meetings: 0,
    announcements: 0,
    risks: 0,
  });

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const { getWorkspace } =
      await import("@/lib/clubops");

    const workspace =
      await getWorkspace();

    const supabase = (
      await import("@/lib/supabase/client")
    ).createClient();

    const [
      members,
      events,
      tasks,
      meetings,
      announcements,
      risks,
    ] = await Promise.all([
      supabase
        .from("members")
        .select("id", { count: "exact" })
        .eq(
          "club_id",
          workspace.clubId
        ),

      supabase
        .from("events")
        .select("id", { count: "exact" })
        .eq(
          "club_id",
          workspace.clubId
        ),

      supabase
        .from("tasks")
        .select(
          "id,status,due_date"
        )
        .eq(
          "club_id",
          workspace.clubId
        ),

      supabase
        .from("meetings")
        .select("id", {
          count: "exact",
        })
        .eq(
          "club_id",
          workspace.clubId
        ),

      supabase
        .from("announcements")
        .select("id", {
          count: "exact",
        })
        .eq(
          "club_id",
          workspace.clubId
        ),

      supabase
        .from("risks")
        .select("id", {
          count: "exact",
        })
        .eq(
          "club_id",
          workspace.clubId
        ),
    ]);

    const today =
      new Date()
        .toISOString()
        .split("T")[0];

    const taskRows =
      tasks.data || [];

    setData({
      members:
        members.count || 0,

      events:
        events.count || 0,

      tasks:
        taskRows.length,

      completed:
        taskRows.filter(
          (task) =>
            task.status ===
            "Completed"
        ).length,

      overdue:
        taskRows.filter(
          (task) =>
            task.status !==
              "Completed" &&
            task.due_date &&
            task.due_date <
              today
        ).length,

      meetings:
        meetings.count || 0,

      announcements:
        announcements.count || 0,

      risks:
        risks.count || 0,
    });
  }

  return (
    <div className="clubops-dashboard">
      <Sidebar />

      <main className="clubops-main">
        <Topbar />

        <section className="clubops-content">
          <div className="clubops-welcome">
            <div>
              <span>ANALYTICS</span>
              <h2>Operations Reports</h2>
              <p>
                Live metrics calculated from Supabase.
              </p>
            </div>
          </div>

          <div className="clubops-stat-grid">
            <Stat
              title="Members"
              value={data.members}
            />

            <Stat
              title="Events"
              value={data.events}
            />

            <Stat
              title="Tasks"
              value={data.tasks}
            />

            <Stat
              title="Completed"
              value={data.completed}
            />

            <Stat
              title="Overdue"
              value={data.overdue}
            />

            <Stat
              title="Risks"
              value={data.risks}
            />
          </div>

          <section className="clubops-panel">
            <div className="clubops-panel-title">
              <div>
                <span>CLUB HEALTH</span>
                <h3>Operational Overview</h3>
              </div>
            </div>

            <div className="clubops-list">
              <Row
                label="Meetings"
                value={data.meetings}
              />

              <Row
                label="Announcements"
                value={data.announcements}
              />

              <Row
                label="Completed tasks"
                value={data.completed}
              />

              <Row
                label="Overdue tasks"
                value={data.overdue}
              />

              <Row
                label="Open risks"
                value={data.risks}
              />
            </div>
          </section>
        </section>
      </main>
    </div>
  );
}

function Stat({ title, value }) {
  return (
    <article className="clubops-stat">
      <small>{title}</small>
      <strong>{value}</strong>
    </article>
  );
}

function Row({ label, value }) {
  return (
    <div className="clubops-list-row">
      <div>
        <strong>{label}</strong>
      </div>

      <span className="status-badge">
        {value}
      </span>
    </div>
  );
}