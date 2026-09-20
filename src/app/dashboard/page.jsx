"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";

import {
  formatDate,
  formatMoney,
  getWorkspace,
  initials,
} from "@/lib/clubops";

export default function DashboardPage() {
  const [workspace, setWorkspace] = useState(null);

  const [events, setEvents] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [meetings, setMeetings] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [budget, setBudget] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      const result = await getWorkspace();

      setWorkspace(result);

      const supabase = (
        await import("@/lib/supabase/client")
      ).createClient();

      const clubId = result.clubId;

      if (!clubId) return;

      const [
        eventResult,
        taskResult,
        meetingResult,
        announcementResult,
        volunteerResult,
        budgetResult,
      ] = await Promise.all([
        supabase
          .from("events")
          .select("*")
          .eq("club_id", clubId)
          .order("event_date", { ascending: true }),

        supabase
          .from("tasks")
          .select("*")
          .eq("club_id", clubId)
          .order("due_date", { ascending: true }),

        supabase
          .from("meetings")
          .select("*")
          .eq("club_id", clubId)
          .order("meeting_date", { ascending: true }),

        supabase
          .from("announcements")
          .select("*")
          .eq("club_id", clubId)
          .order("created_at", { ascending: false }),

        supabase
          .from("members")
          .select("*")
          .eq("club_id", clubId)
          .eq("role", "Volunteer")
          .eq("status", "Active"),

        supabase
          .from("event_budgets")
          .select("*")
          .eq("club_id", clubId),
      ]);

      setEvents(eventResult.data || []);
      setTasks(taskResult.data || []);
      setMeetings(meetingResult.data || []);
      setAnnouncements(announcementResult.data || []);
      setVolunteers(volunteerResult.data || []);
      setBudget(budgetResult.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingEvents = useMemo(
    () =>
      events.filter(
        (event) =>
          new Date(`${event.event_date}T00:00:00`) >= today &&
          event.status !== "Cancelled"
      ),
    [events]
  );

  const pendingTasks = tasks.filter(
    (task) => task.status !== "Completed"
  );

  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  );

  const overdueTasks = pendingTasks.filter(
    (task) =>
      task.due_date &&
      new Date(`${task.due_date}T00:00:00`) < today
  );

  const progress =
    tasks.length === 0
      ? 0
      : Math.round(
          (completedTasks.length / tasks.length) * 100
        );

  const totalBudget = budget.reduce(
    (sum, item) =>
      sum + Number(item.allocated_amount || 0),
    0
  );

  const totalSpent = budget.reduce(
    (sum, item) =>
      sum + Number(item.spent_amount || 0),
    0
  );

  const nextMeeting = meetings.find(
    (meeting) =>
      new Date(`${meeting.meeting_date}T00:00:00`) >= today
  );

  if (loading) {
    return (
      <div className="clubops-dashboard-loading">
        Loading ClubOps workspace...
      </div>
    );
  }

  return (
    <div className="clubops-dashboard">
      <Sidebar />

      <main className="clubops-main">
        <Topbar />

        <section className="clubops-content">

          <div className="clubops-welcome">
            <div>
              <span>LIVE CLUB WORKSPACE</span>

              <h2>
                Welcome,{" "}
                {workspace?.profile?.full_name ||
                  "Club Member"}{" "}
                👋
              </h2>

              <p>
                Everything below is live data from your
                Supabase workspace.
              </p>
            </div>

            <div className="clubops-role-card">
              <small>ROLE</small>
              <strong>
                {workspace?.role || "VOLUNTEER"}
              </strong>
            </div>
          </div>

          <div className="clubops-stat-grid">

            <Stat
              label="Members"
              value={events ? volunteers.length : 0}
              icon="👥"
              note="Active volunteers"
            />

            <Stat
              label="Upcoming Events"
              value={upcomingEvents.length}
              icon="📅"
              note="Scheduled"
            />

            <Stat
              label="Pending Tasks"
              value={pendingTasks.length}
              icon="☑"
              note={`${overdueTasks.length} overdue`}
            />

            <Stat
              label="Task Progress"
              value={`${progress}%`}
              icon="📈"
              note={`${completedTasks.length} completed`}
            />

            <Stat
              label="Budget"
              value={formatMoney(totalBudget)}
              icon="₹"
              note={`${formatMoney(totalSpent)} spent`}
            />

            <Stat
              label="Available Volunteers"
              value={volunteers.length}
              icon="🙋"
              note="Active volunteers"
            />

          </div>

          <div className="clubops-main-grid">

            <section className="clubops-panel">
              <PanelTitle
                eyebrow="EVENT MANAGEMENT"
                title="Upcoming Events"
                link="/events"
              />

              {upcomingEvents.length === 0 ? (
                <Empty
                  title="No events yet"
                  text="Create your first event to start managing operations."
                />
              ) : (
                <div className="clubops-list">
                  {upcomingEvents
                    .slice(0, 5)
                    .map((event) => (
                      <div
                        className="clubops-list-row"
                        key={event.id}
                      >
                        <div className="clubops-date-box">
                          <strong>
                            {new Date(
                              `${event.event_date}T00:00:00`
                            ).getDate()}
                          </strong>

                          <small>
                            {new Date(
                              `${event.event_date}T00:00:00`
                            ).toLocaleDateString(
                              "en-IN",
                              { month: "short" }
                            )}
                          </small>
                        </div>

                        <div>
                          <strong>{event.name}</strong>

                          <p>
                            {event.location ||
                              "Location not added"}
                          </p>

                          <small>
                            Expected students:{" "}
                            {event.expected_students || 0}
                          </small>
                        </div>

                        <span className="status-badge">
                          {event.status}
                        </span>
                      </div>
                    ))}
                </div>
              )}
            </section>

            <section className="clubops-panel">
              <PanelTitle
                eyebrow="TASK MANAGEMENT"
                title="Task Progress"
                link="/tasks"
              />

              <div className="progress-card">
                <div>
                  <strong>{progress}%</strong>
                  <span>overall completion</span>
                </div>

                <div className="progress-track">
                  <div
                    style={{
                      width: `${progress}%`,
                    }}
                  />
                </div>
              </div>

              <div className="task-summary">
                <Summary
                  label="Completed"
                  value={completedTasks.length}
                />

                <Summary
                  label="Pending"
                  value={pendingTasks.length}
                />

                <Summary
                  label="Overdue"
                  value={overdueTasks.length}
                />
              </div>

              <div className="clubops-list compact">
                {pendingTasks
                  .slice(0, 4)
                  .map((task) => (
                    <div
                      className="clubops-list-row"
                      key={task.id}
                    >
                      <div className="task-dot" />

                      <div>
                        <strong>{task.title}</strong>

                        <p>
                          Due{" "}
                          {formatDate(task.due_date)}
                        </p>
                      </div>

                      <span
                        className={`priority ${String(
                          task.priority
                        ).toLowerCase()}`}
                      >
                        {task.priority}
                      </span>
                    </div>
                  ))}
              </div>
            </section>

          </div>

          <div className="clubops-main-grid">

            <section className="clubops-panel">
              <PanelTitle
                eyebrow="CALENDAR"
                title="Next Meeting"
                link="/meetings"
              />

              {nextMeeting ? (
                <div className="feature-card">
                  <span>🗓️</span>

                  <div>
                    <strong>
                      {nextMeeting.title}
                    </strong>

                    <p>
                      {formatDate(
                        nextMeeting.meeting_date
                      )}
                      {" • "}
                      {nextMeeting.start_time ||
                        "Time not set"}
                    </p>

                    <small>
                      {nextMeeting.location ||
                        "Online / location not set"}
                    </small>
                  </div>
                </div>
              ) : (
                <Empty
                  title="No upcoming meeting"
                  text="Schedule your next coordination meeting."
                />
              )}
            </section>

            <section className="clubops-panel">
              <PanelTitle
                eyebrow="COMMUNICATION"
                title="Latest Announcement"
                link="/announcements"
              />

              {announcements[0] ? (
                <div className="announcement-card">
                  <span>
                    {announcements[0].priority}
                  </span>

                  <h3>
                    {announcements[0].title}
                  </h3>

                  <p>
                    {announcements[0].content}
                  </p>
                </div>
              ) : (
                <Empty
                  title="No announcements"
                  text="Important club communication will appear here."
                />
              )}
            </section>

          </div>

          <section className="clubops-panel">
            <PanelTitle
              eyebrow="OPERATIONS"
              title="Quick Actions"
            />

            <div className="quick-actions">

              <Quick
                href="/events"
                icon="📅"
                title="Create Event"
                text="Plan event details and expected students."
              />

              <Quick
                href="/tasks"
                icon="☑"
                title="Assign Task"
                text="Assign work and track deadlines."
              />

              <Quick
                href="/budget"
                icon="₹"
                title="Plan Budget"
                text="Track allocation, spending and balance."
              />

              <Quick
                href="/ai-assistant"
                icon="✦"
                title="Ask AI"
                text="Generate event plans, risks and communication."
              />

            </div>
          </section>

        </section>
      </main>
    </div>
  );
}

function Stat({ label, value, icon, note }) {
  return (
    <article className="clubops-stat">
      <span className="clubops-stat-icon">
        {icon}
      </span>

      <small>{label}</small>

      <strong>{value}</strong>

      <p>{note}</p>
    </article>
  );
}

function PanelTitle({ eyebrow, title, link }) {
  return (
    <div className="clubops-panel-title">
      <div>
        <span>{eyebrow}</span>
        <h3>{title}</h3>
      </div>

      {link && (
        <Link href={link}>
          View all →
        </Link>
      )}
    </div>
  );
}

function Summary({ label, value }) {
  return (
    <div>
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}

function Empty({ title, text }) {
  return (
    <div className="clubops-empty">
      <strong>{title}</strong>
      <p>{text}</p>
    </div>
  );
}

function Quick({ href, icon, title, text }) {
  return (
    <Link href={href} className="quick-action">
      <span>{icon}</span>

      <div>
        <strong>{title}</strong>
        <p>{text}</p>
      </div>
    </Link>
  );
}