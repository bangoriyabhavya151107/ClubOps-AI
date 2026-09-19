"use client";

import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";

const attendance = [
  {
    name: "Rahul Patel",
    event: "Annual Club Meeting",
    date: "24 Sep 2026",
    status: "Present",
  },
  {
    name: "Priya Shah",
    event: "Annual Club Meeting",
    date: "24 Sep 2026",
    status: "Present",
  },
  {
    name: "Amit Patel",
    event: "Annual Club Meeting",
    date: "24 Sep 2026",
    status: "Absent",
  },
  {
    name: "Neha Shah",
    event: "Annual Club Meeting",
    date: "24 Sep 2026",
    status: "Present",
  },
];

export default function AttendancePage() {
  return (
    <div className="dashboard-layout">

      <Sidebar />

      <main className="main-content">

        <Topbar />

        <section className="dashboard-content">

          <div className="page-heading">

            <div>
              <h1>Attendance</h1>
              <p>Track member attendance</p>
            </div>

          </div>

          <div className="stats-grid">

            <div className="stat-card">
              <p>Total Members</p>
              <h2>248</h2>
            </div>

            <div className="stat-card">
              <p>Present</p>
              <h2>216</h2>
            </div>

            <div className="stat-card">
              <p>Absent</p>
              <h2>32</h2>
            </div>

            <div className="stat-card">
              <p>Attendance Rate</p>
              <h2>87%</h2>
            </div>

          </div>

          <div className="dashboard-card">

            <div className="table-wrapper">

              <table>

                <thead>
                  <tr>
                    <th>Member</th>
                    <th>Event</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>

                  {attendance.map((item) => (
                    <tr key={item.name}>

                      <td>{item.name}</td>

                      <td>{item.event}</td>

                      <td>{item.date}</td>

                      <td>
                        <span
                          className={
                            item.status === "Present"
                              ? "status-badge"
                              : "absent-badge"
                          }
                        >
                          {item.status}
                        </span>
                      </td>

                    </tr>
                  ))}

                </tbody>

              </table>

            </div>

          </div>

        </section>

      </main>

    </div>
  );
}