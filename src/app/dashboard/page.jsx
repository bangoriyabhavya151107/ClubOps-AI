"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import Link from "next/link";

import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";

import {
  formatDate,
  formatMoney,
  formatTime,
  getWorkspace,
} from "@/lib/clubops";

import styles from "./dashboard.module.css";

export default function DashboardPage() {
  const [workspace, setWorkspace] = useState(null);
  const [events, setEvents] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [meetings, setMeetings] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [members, setMembers] = useState([]);
  const [budget, setBudget] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [copilotInput, setCopilotInput] = useState("");
  const [copilotResponse, setCopilotResponse] = useState("");
  const [copilotLoading, setCopilotLoading] = useState(false);
  const [copilotCopied, setCopilotCopied] = useState(false);

  async function handleAskCopilot(promptText = copilotInput) {
    const text = promptText.trim();
    if (!text) return;

    setCopilotLoading(true);
    setCopilotResponse("");

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: text }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "AI generation failed.");
      setCopilotResponse(data.text);
    } catch (err) {
      console.error("Copilot error:", err);
      setCopilotResponse("AI Copilot is momentarily busy. You can also visit the dedicated AI Assistant page.");
    } finally {
      setCopilotLoading(false);
    }
  }

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      setLoading(true);
      setError("");

      const workspaceData = await getWorkspace();

      setWorkspace(workspaceData);

      const supabase = (
        await import("@/lib/supabase/client")
      ).createClient();

      const clubId = workspaceData.clubId;

      if (!clubId) {
        throw new Error(
          "No club workspace is connected to this account."
        );
      }

      const [
        eventResult,
        taskResult,
        meetingResult,
        announcementResult,
        memberResult,
        budgetResult,
      ] = await Promise.all([
        supabase
          .from("events")
          .select("*")
          .eq("club_id", clubId)
          .order("event_date", {
            ascending: true,
          }),

        supabase
          .from("tasks")
          .select("*")
          .eq("club_id", clubId)
          .order("due_date", {
            ascending: true,
          }),

        supabase
          .from("meetings")
          .select("*")
          .eq("club_id", clubId)
          .order("meeting_date", {
            ascending: true,
          }),

        supabase
          .from("announcements")
          .select("*")
          .eq("club_id", clubId)
          .order("created_at", {
            ascending: false,
          }),

        supabase
          .from("members")
          .select("*")
          .or(`club_id.eq.${clubId},club_id.is.null`)
          .order("name"),

        supabase
          .from("event_budgets")
          .select("*")
          .eq("club_id", clubId),
      ]);

      if (eventResult.error) {
        throw eventResult.error;
      }

      if (taskResult.error) {
        throw taskResult.error;
      }

      if (meetingResult.error) {
        throw meetingResult.error;
      }

      if (announcementResult.error) {
        throw announcementResult.error;
      }

      if (memberResult.error) {
        throw memberResult.error;
      }

      if (budgetResult.error) {
        throw budgetResult.error;
      }

      setEvents(eventResult.data || []);
      setTasks(taskResult.data || []);
      setMeetings(meetingResult.data || []);
      setAnnouncements(announcementResult.data || []);
      setMembers(memberResult.data || []);
      setBudget(budgetResult.data || []);
    } catch (dashboardError) {
      console.error(
        "Dashboard loading error:",
        dashboardError
      );

      setError(
        dashboardError?.message ||
          "Unable to load the dashboard."
      );
    } finally {
      setLoading(false);
    }
  }

  const today = useMemo(() => {
    const value = new Date();

    value.setHours(0, 0, 0, 0);

    return value;
  }, []);

  const upcomingEvents = useMemo(() => {
    return events.filter((event) => {
      if (!event.event_date) {
        return false;
      }

      const date = new Date(
        `${event.event_date}T00:00:00`
      );

      return (
        date >= today &&
        String(event.status || "").toLowerCase() !==
          "cancelled"
      );
    });
  }, [events, today]);

  const completedTasks = useMemo(() => {
    return tasks.filter(
      (task) =>
        String(task.status || "").toLowerCase() ===
        "completed"
    );
  }, [tasks]);

  const pendingTasks = useMemo(() => {
    return tasks.filter(
      (task) =>
        String(task.status || "").toLowerCase() !==
        "completed"
    );
  }, [tasks]);

  const overdueTasks = useMemo(() => {
    return pendingTasks.filter((task) => {
      if (!task.due_date) {
        return false;
      }

      return (
        new Date(
          `${task.due_date}T00:00:00`
        ) < today
      );
    });
  }, [pendingTasks, today]);

  const taskProgress = tasks.length
    ? Math.round(
        (completedTasks.length /
          tasks.length) *
          100
      )
    : 0;

  const totalBudget = budget.reduce(
    (sum, item) =>
      sum +
      Number(
        item.allocated_amount || 0
      ),
    0
  );

  const totalSpent = budget.reduce(
    (sum, item) =>
      sum +
      Number(
        item.spent_amount || 0
      ),
    0
  );

  const nextMeeting = meetings.find(
    (meeting) => {
      if (!meeting.meeting_date) {
        return false;
      }

      return (
        new Date(
          `${meeting.meeting_date}T00:00:00`
        ) >= today
      );
    }
  );

  if (loading) {
    return (
      <div className={styles.loadingPage}>
        <div className={styles.loadingOrb}>
          C
        </div>

        <h2>
          Loading your workspace
        </h2>

        <p>
          Connecting to ClubOps AI...
        </p>
      </div>
    );
  }

  return (
    <div className={styles.dashboard}>
      <Sidebar />

      <main className={styles.main}>
        <Topbar />

        <div className={styles.content}>
          {error && (
            <div className={styles.error}>
              <strong>
                Dashboard error
              </strong>

              <span>{error}</span>

              <button
                type="button"
                onClick={loadDashboard}
              >
                Retry
              </button>
            </div>
          )}

          <section className={styles.hero}>
            <div>
              <span className={styles.eyebrow}>
                CLUBOPS AI · LIVE WORKSPACE
              </span>

              <h1>
                Welcome{" "}
                {workspace?.profile?.full_name ||
                  "Club Member"}
                <span> 👋</span>
              </h1>

              <p>
                Your club operations at a
                glance. Everything here is
                connected to your live Supabase
                workspace.
              </p>
            </div>

            <div className={styles.roleCard}>
              <span>CURRENT ROLE</span>

              <strong>
                {workspace?.role ||
                  "VOLUNTEER"}
              </strong>

              <small>
                Workspace member
              </small>
            </div>
          </section>

          <section className={styles.stats}>
            <Stat
              icon="👥"
              label="Active Members"
              value={members.length}
              note="People in your workspace"
            />

            <Stat
              icon="◈"
              label="Upcoming Events"
              value={upcomingEvents.length}
              note="Scheduled events"
            />

            <Stat
              icon="✓"
              label="Pending Tasks"
              value={pendingTasks.length}
              note={`${overdueTasks.length} overdue`}
            />

            <Stat
              icon="↗"
              label="Task Progress"
              value={`${taskProgress}%`}
              note={`${completedTasks.length} completed`}
            />

            <Stat
              icon="₹"
              label="Budget"
              value={formatMoney(totalBudget)}
              note={`${formatMoney(
                totalSpent
              )} spent`}
            />
          </section>

          <section className={styles.grid}>
            <div className={styles.panel}>
              <PanelHeader
                eyebrow="EVENT MANAGEMENT"
                title="Upcoming Events"
                href="/events"
              />

              {upcomingEvents.length === 0 ? (
                <EmptyState
                  icon="◈"
                  title="No upcoming events"
                  text="Create your first event to start planning club activities."
                  href="/events?new=1"
                  action="Create Event"
                />
              ) : (
                <div className={styles.eventList}>
                  {upcomingEvents
                    .slice(0, 5)
                    .map((event) => (
                      <div
                        key={event.id}
                        className={styles.eventRow}
                      >
                        <div
                          className={
                            styles.dateBox
                          }
                        >
                          <strong>
                            {new Date(
                              `${event.event_date}T00:00:00`
                            ).getDate()}
                          </strong>

                          <span>
                            {new Date(
                              `${event.event_date}T00:00:00`
                            ).toLocaleDateString(
                              "en-IN",
                              {
                                month: "short",
                              }
                            )}
                          </span>
                        </div>

                        <div
                          className={
                            styles.eventInfo
                          }
                        >
                          <strong>
                            {event.name}
                          </strong>

                          <p>
                            {event.location ||
                              "Location not set"}
                          </p>

                          <small>
                            {formatTime(
                              event.start_time
                            ) ||
                              "Time not set"}
                          </small>
                        </div>

                        <span
                          className={
                            styles.badge
                          }
                        >
                          {event.status ||
                            "Planned"}
                        </span>
                      </div>
                    ))}
                </div>
              )}
            </div>

            <div className={styles.panel}>
              <PanelHeader
                eyebrow="TASK MANAGEMENT"
                title="Task Progress"
                href="/tasks"
              />

              <div
                className={
                  styles.progressCard
                }
              >
                <div
                  className={
                    styles.progressNumber
                  }
                >
                  <strong>
                    {taskProgress}%
                  </strong>

                  <span>
                    overall completion
                  </span>
                </div>

                <div
                  className={
                    styles.progressTrack
                  }
                >
                  <div
                    style={{
                      width: `${taskProgress}%`,
                    }}
                  />
                </div>
              </div>

              <div className={styles.taskStats}>
                <div>
                  <strong>
                    {completedTasks.length}
                  </strong>

                  <span>
                    Completed
                  </span>
                </div>

                <div>
                  <strong>
                    {pendingTasks.length}
                  </strong>

                  <span>
                    Pending
                  </span>
                </div>

                <div>
                  <strong>
                    {overdueTasks.length}
                  </strong>

                  <span>
                    Overdue
                  </span>
                </div>
              </div>

              <div className={styles.taskList}>
                {pendingTasks
                  .slice(0, 4)
                  .map((task) => {
                    const priorityClass =
                      `priority${String(
                        task.priority ||
                          "Medium"
                      )
                        .replace(/\s/g, "")
                        .toLowerCase()}`;

                    return (
                      <div
                        key={task.id}
                        className={styles.taskRow}
                      >
                        <div
                          className={
                            styles.taskIcon
                          }
                        >
                          ✓
                        </div>

                        <div>
                          <strong>
                            {task.title ||
                              "Untitled task"}
                          </strong>

                          <span>
                            Due{" "}
                            {formatDate(
                              task.due_date
                            )}
                          </span>
                        </div>

                        <em
                          className={
                            styles[
                              priorityClass
                            ]
                          }
                        >
                          {task.priority ||
                            "Medium"}
                        </em>
                      </div>
                    );
                  })}

                {pendingTasks.length === 0 && (
                  <div
                    className={
                      styles.miniEmpty
                    }
                  >
                    All tasks are completed.
                  </div>
                )}
              </div>
            </div>
          </section>

          <section className={styles.grid}>
            <div className={styles.panel}>
              <PanelHeader
                eyebrow="MEETING INTELLIGENCE"
                title="Next Meeting"
                href="/meetings"
              />

              {nextMeeting ? (
                <div
                  className={
                    styles.meetingCard
                  }
                >
                  <div
                    className={
                      styles.meetingIcon
                    }
                  >
                    ◷
                  </div>

                  <div>
                    <strong>
                      {nextMeeting.title ||
                        "Club Meeting"}
                    </strong>

                    <p>
                      {formatDate(
                        nextMeeting.meeting_date
                      )}
                      {" · "}
                      {formatTime(
                        nextMeeting.start_time
                      ) ||
                        "Time not set"}
                    </p>

                    <span>
                      {nextMeeting.location ||
                        "Location not set"}
                    </span>
                  </div>
                </div>
              ) : (
                <EmptyState
                  icon="◷"
                  title="No upcoming meetings"
                  text="Schedule your next club coordination meeting."
                  href="/meetings?new=1"
                  action="Schedule Meeting"
                />
              )}
            </div>

            <div className={styles.panel}>
              <PanelHeader
                eyebrow="COMMUNICATION"
                title="Latest Announcement"
                href="/announcements"
              />

              {announcements[0] ? (
                <div
                  className={
                    styles.announcement
                  }
                >
                  <span>
                    {announcements[0]
                      .priority ||
                      "Normal"}
                  </span>

                  <h3>
                    {announcements[0].title}
                  </h3>

                  <p>
                    {announcements[0].content}
                  </p>

                  <small>
                    {formatDate(
                      announcements[0]
                        .created_at
                    )}
                  </small>
                </div>
              ) : (
                <EmptyState
                  icon="!"
                  title="No announcements"
                  text="Important club communication will appear here."
                  href="/announcements?new=1"
                  action="Create Announcement"
                />
              )}
            </div>
          </section>

          {/* ClubOps AI Live Copilot Card */}
          <section style={{
            background: "#fff",
            border: "1px solid rgba(0,0,0,0.08)",
            borderRadius: "28px",
            padding: "2.5rem",
            marginBottom: "4rem",
            boxShadow: "0 10px 30px rgba(0,0,0,0.02)"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem", marginBottom: "1.5rem" }}>
              <div>
                <span className="eyebrow">INTELLIGENT OPERATIONS COPILOT</span>
                <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", fontWeight: 800, letterSpacing: "-0.05em", margin: "0.2rem 0 0.4rem", color: "#111" }}>
                  Ask ClubOps AI.
                </h2>
                <p style={{ margin: 0, fontSize: "0.95rem", color: "rgba(17,17,17,0.6)" }}>
                  Need an event agenda, volunteer task breakdown, or campus announcement? Let Gemini accelerate your club.
                </p>
              </div>
              <Link href="/ai-assistant" className="apple-ai-item" style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.6rem 1.2rem",
                borderRadius: "999px",
                border: "1px solid rgba(0,0,0,0.15)",
                fontSize: "0.82rem",
                fontWeight: 700,
                textDecoration: "none"
              }}>
                <span>Full AI Suite →</span>
              </Link>
            </div>

            {/* Quick Prompt Starters */}
            <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap", marginBottom: "1.2rem" }}>
              {[
                "Draft 2-Day Hackathon Schedule",
                "Create Volunteer Task Checklist",
                "Write Campus Registration Announcement",
                "Suggest Budget Allocation for INR 50,000",
              ].map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => {
                    setCopilotInput(prompt);
                    handleAskCopilot(prompt);
                  }}
                  style={{
                    padding: "0.45rem 0.9rem",
                    borderRadius: "999px",
                    background: "rgba(0,0,0,0.04)",
                    border: "1px solid rgba(0,0,0,0.08)",
                    fontSize: "0.78rem",
                    fontWeight: 600,
                    color: "rgba(17,17,17,0.8)",
                    cursor: "pointer",
                    transition: "all 0.15s ease"
                  }}
                >
                  ⚡ {prompt}
                </button>
              ))}
            </div>

            {/* Copilot Input */}
            <form onSubmit={(e) => { e.preventDefault(); handleAskCopilot(); }} style={{ display: "flex", gap: "0.8rem", marginBottom: copilotResponse ? "1.5rem" : 0 }}>
              <input
                type="text"
                value={copilotInput}
                onChange={(e) => setCopilotInput(e.target.value)}
                placeholder="Ask anything about running your club (e.g., 'What permissions does a Coordinator need?')"
                style={{
                  flex: 1,
                  padding: "0.85rem 1.2rem",
                  borderRadius: "14px",
                  border: "1px solid rgba(0,0,0,0.15)",
                  background: "#fafaf8",
                  fontSize: "0.92rem",
                  color: "#111"
                }}
              />
              <button
                type="submit"
                disabled={copilotLoading || !copilotInput.trim()}
                style={{
                  padding: "0.85rem 1.6rem",
                  borderRadius: "999px",
                  border: 0,
                  background: "#111",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: "0.88rem",
                  cursor: copilotLoading || !copilotInput.trim() ? "not-allowed" : "pointer",
                  opacity: copilotLoading || !copilotInput.trim() ? 0.6 : 1,
                  whiteSpace: "nowrap"
                }}
              >
                {copilotLoading ? "Generating..." : "Ask AI"}
              </button>
            </form>

            {/* Copilot Response Card */}
            {copilotResponse && (
              <div style={{
                background: "#fafaf8",
                border: "1px solid rgba(0,0,0,0.1)",
                borderRadius: "18px",
                padding: "1.5rem",
                marginTop: "1rem"
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.8rem" }}>
                  <span style={{ fontSize: "0.75rem", fontWeight: 750, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(17,17,17,0.5)" }}>
                    AI GENERATED INSIGHT
                  </span>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(copilotResponse);
                        setCopilotCopied(true);
                        setTimeout(() => setCopilotCopied(false), 2000);
                      }}
                      style={{
                        background: "transparent",
                        border: "1px solid rgba(0,0,0,0.15)",
                        padding: "0.3rem 0.8rem",
                        borderRadius: "999px",
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        cursor: "pointer"
                      }}
                    >
                      {copilotCopied ? "✓ Copied" : "Copy"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setCopilotResponse("")}
                      style={{
                        background: "transparent",
                        border: 0,
                        fontSize: "0.75rem",
                        color: "rgba(17,17,17,0.5)",
                        cursor: "pointer"
                      }}
                    >
                      Clear
                    </button>
                  </div>
                </div>
                <div style={{
                  fontSize: "0.92rem",
                  lineHeight: 1.65,
                  color: "#111",
                  whiteSpace: "pre-wrap",
                  fontFamily: "inherit"
                }}>
                  {copilotResponse}
                </div>
              </div>
            )}
          </section>

          <section
            className={styles.quick}
          >
            <div
              className={
                styles.quickHeading
              }
            >
              <div>
                <span>OPERATIONS</span>

                <h2>
                  Quick Actions
                </h2>
              </div>

              <Link href="/ai-assistant">
                Ask ClubOps AI →
              </Link>
            </div>

            <div
              className={styles.quickGrid}
            >
              <QuickAction
                href="/events?new=1"
                icon="◈"
                title="Create Event"
                text="Plan your next club activity."
              />

              <QuickAction
                href="/tasks?new=1"
                icon="✓"
                title="Assign Task"
                text="Give work to a team member."
              />

              <QuickAction
                href="/attendance"
                icon="◎"
                title="Mark Attendance"
                text="Record event participation."
              />

              <QuickAction
                href="/members"
                icon="♙"
                title="Manage Members"
                text="Keep your club team organized."
              />

              <QuickAction
                href="/budget"
                icon="₹"
                title="Manage Budget"
                text="Track event allocation and spending."
              />

              <QuickAction
                href="/ai-assistant"
                icon="✦"
                title="Ask AI"
                text="Generate plans and operational ideas."
              />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

function Stat({
  icon,
  label,
  value,
  note,
}) {
  return (
    <article className={styles.stat}>
      <div className={styles.statTop}>
        <span
          className={styles.statIcon}
        >
          {icon}
        </span>

        <span
          className={styles.statLabel}
        >
          {label}
        </span>
      </div>

      <strong>{value}</strong>

      <p>{note}</p>
    </article>
  );
}

function PanelHeader({
  eyebrow,
  title,
  href,
}) {
  return (
    <div
      className={styles.panelHeader}
    >
      <div>
        <span>{eyebrow}</span>

        <h2>{title}</h2>
      </div>

      {href && (
        <Link href={href}>
          View all →
        </Link>
      )}
    </div>
  );
}

function EmptyState({
  icon,
  title,
  text,
  href,
  action,
}) {
  return (
    <div className={styles.empty}>
      <div
        className={styles.emptyIcon}
      >
        {icon}
      </div>

      <strong>{title}</strong>

      <p>{text}</p>

      {href && (
        <Link
          href={href}
          className={
            styles.emptyAction
          }
        >
          {action}
        </Link>
      )}
    </div>
  );
}

function QuickAction({
  href,
  icon,
  title,
  text,
}) {
  return (
    <Link
      href={href}
      className={
        styles.quickAction
      }
    >
      <span>{icon}</span>

      <div>
        <strong>{title}</strong>

        <p>{text}</p>
      </div>

      <b>→</b>
    </Link>
  );
}