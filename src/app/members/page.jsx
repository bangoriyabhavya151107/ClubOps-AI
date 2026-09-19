"use client";

import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";

const members = [
  {
    name: "Rahul Patel",
    email: "rahul@example.com",
    role: "Member",
    status: "Active",
  },
  {
    name: "Priya Shah",
    email: "priya@example.com",
    role: "Volunteer",
    status: "Active",
  },
  {
    name: "Amit Patel",
    email: "amit@example.com",
    role: "Member",
    status: "Active",
  },
  {
    name: "Neha Shah",
    email: "neha@example.com",
    role: "Coordinator",
    status: "Active",
  },
];

export default function MembersPage() {
  return (
    <div className="dashboard-layout">

      <Sidebar />

      <main className="main-content">

        <Topbar />

        <section className="dashboard-content">

          <div className="page-heading">
            <div>
              <h1>Members</h1>
              <p>Manage your club members</p>
            </div>

            <button className="primary-button">
              + Add Member
            </button>
          </div>

          <div className="dashboard-card">

            <div className="search-bar">

              <input
                type="text"
                placeholder="Search members..."
              />

              <select>
                <option>All Roles</option>
                <option>Member</option>
                <option>Volunteer</option>
                <option>Coordinator</option>
              </select>

            </div>

            <div className="table-wrapper">

              <table>

                <thead>
                  <tr>
                    <th>Member</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>

                  {members.map((member) => (
                    <tr key={member.email}>

                      <td>
                        <div className="member-name">
                          <div className="small-avatar">
                            {member.name.charAt(0)}
                          </div>

                          {member.name}
                        </div>
                      </td>

                      <td>{member.email}</td>

                      <td>{member.role}</td>

                      <td>
                        <span className="status-badge">
                          {member.status}
                        </span>
                      </td>

                      <td>
                        <button className="action-button">
                          View
                        </button>
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