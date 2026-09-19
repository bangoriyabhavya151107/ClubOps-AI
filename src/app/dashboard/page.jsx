"use client";

import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";

const stats = [
  {
    title: "Total Members",
    value: "248",
    change: "+12%",
    icon: "👥",
  },
  {
    title: "Upcoming Events",
    value: "18",
    change: "+5%",
    icon: "📅",
  },
  {
    title: "Tasks",
    value: "42",
    change: "+8%",
    icon: "📋",
  },
  {
    title: "Attendance",
    value: "87%",
    change: "+4%",
    icon: "✅",
  },
];

const events = [
  {
    name: "Annual Club Meeting",
    date: "24 Sep 2026",
    time: "10:00 AM",
    status: "Upcoming",
  },
  {
    name: "Volunteer Training",
    date: "27 Sep 2026",
    time: "02:00 PM",
    status: "Upcoming",
  },
  {
    name: "Community Workshop",
    date: "30 Sep 2026",
    time: "11:00 AM",
    status: "Upcoming",
  },
];

const tasks = [
  {
    name: "Prepare event documents",
    priority: "High",
  },
  {
    name: "Contact volunteers",
    priority: "Medium",
  },
  {
    name: "Update member records",
    priority: "Low",
  },
];

export default function DashboardPage() {
  return (
    <div className="dashboard-layout">

      <Sidebar />

      <main className="main-content">

        <Topbar />

        <section className="dashboard-content">

          {/* Statistics */}

          <div className="stats-grid">

            {stats.map((stat) => (
              <div className="stat-card" key={stat.title}>

                <div className="stat-card-top">

                  <div>
                    <p>{stat.title}</p>
                    <h2>{stat.value}</h2>
                  </div>

                  <div className="stat-icon">
                    {stat.icon}
                  </div>

                </div>

                <span className="stat-change">
                  {stat.change} this month
                </span>

              </div>
            ))}

          </div>

          {/* Main Grid */}

          <div className="dashboard-grid">

            {/* Upcoming Events */}

            <div className="dashboard-card">

              <div className="card-header">

                <div>
                  <h2>Upcoming Events</h2>
                  <p>Your upcoming club events</p>
                </div>

                <a href="/events">
                  View All
                </a>

              </div>

              <div className="event-list">

                {events.map((event) => (
                  <div
                    className="event-row"
                    key={event.name}
                  >

                    <div className="event-date">
                      <strong>
                        {event.date.split(" ")[0]}
                      </strong>

                      <span>
                        {event.date.split(" ")[1]}
                      </span>
                    </div>

                    <div className="event-information">

                      <h3>{event.name}</h3>

                      <p>
                        🕐 {event.time}
                      </p>

                    </div>

                    <span className="status-badge">
                      {event.status}
                    </span>

                  </div>
                ))}

              </div>

            </div>

            {/* Tasks */}

            <div className="dashboard-card">

              <div className="card-header">

                <div>
                  <h2>Pending Tasks</h2>
                  <p>Tasks that need attention</p>
                </div>

                <a href="/tasks">
                  View All
                </a>

              </div>

              <div className="task-list">

                {tasks.map((task) => (
                  <div
                    className="task-row"
                    key={task.name}
                  >

                    <div className="task-check">
                      ☐
                    </div>

                    <div className="task-information">
                      <h3>{task.name}</h3>
                      <span>
                        {task.priority} Priority
                      </span>
                    </div>

                  </div>
                ))}

              </div>

            </div>

          </div>

          {/* Quick Actions */}

          <div className="dashboard-card">

            <div className="card-header">

              <div>
                <h2>Quick Actions</h2>
                <p>Frequently used ClubOps features</p>
              </div>

            </div>

            <div className="quick-actions">

              <a href="/events/create">
                <span>➕</span>
                <strong>Create Event</strong>
                <small>Create a new club event</small>
              </a>

              <a href="/members">
                <span>👤</span>
                <strong>Manage Members</strong>
                <small>View and manage members</small>
              </a>

              <a href="/tasks">
                <span>📋</span>
                <strong>Add Task</strong>
                <small>Create a new task</small>
              </a>

              <a href="/announcements">
                <span>📢</span>
                <strong>Announcement</strong>
                <small>Send club announcement</small>
              </a>

            </div>

          </div>

        </section>

      </main>

    </div>
  );
}