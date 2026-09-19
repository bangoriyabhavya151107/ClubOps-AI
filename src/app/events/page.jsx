"use client";

import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";

const events = [
  {
    name: "Annual Club Meeting",
    date: "24 Sep 2026",
    location: "Club Hall",
    status: "Upcoming",
  },
  {
    name: "Volunteer Training",
    date: "27 Sep 2026",
    location: "Training Room",
    status: "Upcoming",
  },
  {
    name: "Community Workshop",
    date: "30 Sep 2026",
    location: "Community Center",
    status: "Upcoming",
  },
  {
    name: "Monthly Review",
    date: "05 Oct 2026",
    location: "Meeting Room",
    status: "Upcoming",
  },
];

export default function EventsPage() {
  return (
    <div className="dashboard-layout">

      <Sidebar />

      <main className="main-content">

        <Topbar />

        <section className="dashboard-content">

          <div className="page-heading">

            <div>
              <h1>Events</h1>
              <p>Create and manage club events</p>
            </div>

            <button className="primary-button">
              + Create Event
            </button>

          </div>

          <div className="events-page-grid">

            {events.map((event) => (
              <div className="event-card" key={event.name}>

                <div className="event-card-icon">
                  📅
                </div>

                <h2>{event.name}</h2>

                <p>
                  📆 {event.date}
                </p>

                <p>
                  📍 {event.location}
                </p>

                <div className="event-card-bottom">

                  <span className="status-badge">
                    {event.status}
                  </span>

                  <button className="action-button">
                    View
                  </button>

                </div>

              </div>
            ))}

          </div>

        </section>

      </main>

    </div>
  );
}