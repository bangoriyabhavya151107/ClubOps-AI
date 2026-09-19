"use client";

import Link from "next/link";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";

const stats = [
  {
    title: "Total Members",
    value: "248",
    description: "Active club members",
    change: "+12%",
    changeText: "vs last month",
    icon: "👥",
    tone: "purple",
  },
  {
    title: "Upcoming Events",
    value: "18",
    description: "Events scheduled",
    change: "+5%",
    changeText: "vs last month",
    icon: "📅",
    tone: "blue",
  },
  {
    title: "Pending Tasks",
    value: "42",
    description: "Tasks need attention",
    change: "+8%",
    changeText: "vs last month",
    icon: "✓",
    tone: "orange",
  },
  {
    title: "Attendance",
    value: "87%",
    description: "Average attendance",
    change: "+4%",
    changeText: "vs last month",
    icon: "📊",
    tone: "green",
  },
];

const events = [
  {
    day: "24",
    month: "SEP",
    name: "Annual Club Meeting",
    description: "Monthly club coordination meeting",
    time: "10:00 AM",
    location: "Conference Room",
  },
  {
    day: "27",
    month: "SEP",
    name: "Volunteer Training",
    description: "Training session for new volunteers",
    time: "02:00 PM",
    location: "Seminar Hall",
  },
  {
    day: "30",
    month: "SEP",
    name: "Community Workshop",
    description: "Community outreach workshop",
    time: "11:00 AM",
    location: "Main Auditorium",
  },
];

const tasks = [
  {
    name: "Prepare event documents",
    category: "Annual Club Meeting",
    priority: "High",
    priorityClass: "high",
  },
  {
    name: "Contact volunteers",
    category: "Volunteer Training",
    priority: "Medium",
    priorityClass: "medium",
  },
  {
    name: "Update member records",
    category: "Administration",
    priority: "Low",
    priorityClass: "low",
  },
  {
    name: "Prepare presentation",
    category: "Community Workshop",
    priority: "Medium",
    priorityClass: "medium",
  },
];

const quickActions = [
  {
    icon: "＋",
    title: "Create Event",
    description: "Schedule a new club event",
    href: "/events/create",
    className: "purple",
  },
  {
    icon: "👤",
    title: "Manage Members",
    description: "View and manage members",
    href: "/members",
    className: "blue",
  },
  {
    icon: "✓",
    title: "Add Task",
    description: "Create and assign a task",
    href: "/tasks",
    className: "orange",
  },
  {
    icon: "🤖",
    title: "Ask AI Assistant",
    description: "Get help with club operations",
    href: "/ai-assistant",
    className: "green",
  },
];

export default function DashboardPage() {
  return (
    <div className="clubops-dashboard">
      <Sidebar />

      <main className="clubops-main">
        <Topbar />

        <div className="clubops-content">
          {/* Welcome */}
          <section className="clubops-welcome">
            <div>
              <span className="clubops-eyebrow">CLUB OVERVIEW</span>

              <h1>Good evening, Club Admin 👋</h1>

              <p>
                Here&apos;s what&apos;s happening with your club today.
              </p>
            </div>

            <div className="clubops-date-card">
              <span className="clubops-date-icon">📅</span>

              <div>
                <strong>September 2026</strong>
                <span>Club Operations</span>
              </div>
            </div>
          </section>

          {/* Statistics */}
          <section className="clubops-stats">
            {stats.map((stat) => (
              <article className="clubops-stat-card" key={stat.title}>
                <div className="clubops-stat-header">
                  <div>
                    <span className="clubops-stat-title">
                      {stat.title}
                    </span>

                    <strong className="clubops-stat-value">
                      {stat.value}
                    </strong>
                  </div>

                  <div
                    className={`clubops-stat-icon ${stat.tone}`}
                  >
                    {stat.icon}
                  </div>
                </div>

                <div className="clubops-stat-footer">
                  <span className="clubops-stat-description">
                    {stat.description}
                  </span>

                  <span className="clubops-stat-change">
                    {stat.change}
                  </span>

                  <span className="clubops-stat-change-text">
                    {stat.changeText}
                  </span>
                </div>
              </article>
            ))}
          </section>

          {/* Main dashboard grid */}
          <section className="clubops-dashboard-grid">
            {/* Events */}
            <article className="clubops-panel clubops-events-panel">
              <div className="clubops-panel-header">
                <div>
                  <span className="clubops-section-label">
                    SCHEDULE
                  </span>

                  <h2>Upcoming Events</h2>

                  <p>
                    Keep track of your club&apos;s upcoming activities.
                  </p>
                </div>

                <Link href="/events" className="clubops-view-link">
                  View all →
                </Link>
              </div>

              <div className="clubops-event-list">
                {events.map((event) => (
                  <div className="clubops-event-item" key={event.name}>
                    <div className="clubops-event-date">
                      <strong>{event.day}</strong>
                      <span>{event.month}</span>
                    </div>

                    <div className="clubops-event-details">
                      <h3>{event.name}</h3>

                      <p>{event.description}</p>

                      <div className="clubops-event-meta">
                        <span>🕐 {event.time}</span>
                        <span>📍 {event.location}</span>
                      </div>
                    </div>

                    <span className="clubops-upcoming-badge">
                      Upcoming
                    </span>
                  </div>
                ))}
              </div>
            </article>

            {/* Tasks */}
            <article className="clubops-panel">
              <div className="clubops-panel-header">
                <div>
                  <span className="clubops-section-label">
                    WORKSPACE
                  </span>

                  <h2>Pending Tasks</h2>

                  <p>Tasks that need your attention.</p>
                </div>

                <Link href="/tasks" className="clubops-view-link">
                  View all →
                </Link>
              </div>

              <div className="clubops-task-list">
                {tasks.map((task) => (
                  <div className="clubops-task-item" key={task.name}>
                    <button
                      type="button"
                      className="clubops-task-checkbox"
                      aria-label={`Complete ${task.name}`}
                    >
                      <span />
                    </button>

                    <div className="clubops-task-content">
                      <h3>{task.name}</h3>

                      <p>{task.category}</p>
                    </div>

                    <span
                      className={`clubops-priority ${task.priorityClass}`}
                    >
                      {task.priority}
                    </span>
                  </div>
                ))}
              </div>
            </article>
          </section>

          {/* Quick Actions */}
          <section className="clubops-panel clubops-actions-panel">
            <div className="clubops-panel-header">
              <div>
                <span className="clubops-section-label">
                  SHORTCUTS
                </span>

                <h2>Quick Actions</h2>

                <p>
                  Jump directly into the tools you use most.
                </p>
              </div>
            </div>

            <div className="clubops-actions-grid">
              {quickActions.map((action) => (
                <Link
                  href={action.href}
                  className="clubops-action-card"
                  key={action.title}
                >
                  <div
                    className={`clubops-action-icon ${action.className}`}
                  >
                    {action.icon}
                  </div>

                  <div>
                    <h3>{action.title}</h3>
                    <p>{action.description}</p>
                  </div>

                  <span className="clubops-action-arrow">→</span>
                </Link>
              ))}
            </div>
          </section>

          {/* Bottom information */}
          <section className="clubops-bottom-grid">
            <article className="clubops-info-card clubops-ai-card">
              <div className="clubops-info-icon">🤖</div>

              <div className="clubops-info-content">
                <span className="clubops-section-label">
                  AI ASSISTANT
                </span>

                <h2>Your club&apos;s AI assistant</h2>

                <p>
                  Need help planning an event, organizing tasks,
                  writing announcements, or managing operations?
                  Ask ClubOps AI.
                </p>

                <Link
                  href="/ai-assistant"
                  className="clubops-info-button"
                >
                  Open AI Assistant →
                </Link>
              </div>
            </article>

            <article className="clubops-info-card clubops-summary-card">
              <div className="clubops-summary-header">
                <div>
                  <span className="clubops-section-label">
                    CLUB STATUS
                  </span>

                  <h2>Operations Summary</h2>
                </div>

                <span className="clubops-status-dot">
                  Active
                </span>
              </div>

              <div className="clubops-summary-list">
                <div>
                  <span>Active members</span>
                  <strong>248</strong>
                </div>

                <div>
                  <span>Events this month</span>
                  <strong>12</strong>
                </div>

                <div>
                  <span>Completed tasks</span>
                  <strong>86%</strong>
                </div>

                <div>
                  <span>Average attendance</span>
                  <strong>87%</strong>
                </div>
              </div>
            </article>
          </section>
        </div>
      </main>
    </div>
  );
}