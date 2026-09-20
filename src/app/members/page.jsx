"use client";

import { useMemo, useState } from "react";
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
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("All Roles");

  const filteredMembers = useMemo(() => {
    return members.filter((member) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        member.name.toLowerCase().includes(searchText) ||
        member.email.toLowerCase().includes(searchText);

      const matchesRole =
        role === "All Roles" || member.role === role;

      return matchesSearch && matchesRole;
    });
  }, [search, role]);

  return (
    <div className="clubops-dashboard">
      <Sidebar />

      <main className="clubops-main">
        <Topbar />

        <section className="clubops-content">
          {/* ============================================================
              PAGE HEADER
              ============================================================ */}

          <div className="clubops-page-intro">
            <div>
              <span className="clubops-eyebrow">
                CLUB MANAGEMENT
              </span>

              <h2>Members</h2>

              <p>
                Manage members, volunteers and coordinators.
              </p>
            </div>

            <button
              type="button"
              className="clubops-primary-button"
            >
              + Add Member
            </button>
          </div>

          {/* ============================================================
              MEMBER STATISTICS
              ============================================================ */}

          <div className="members-stats">
            <div className="member-mini-card">
              <span>Total Members</span>

              <strong>248</strong>
            </div>

            <div className="member-mini-card">
              <span>Active</span>

              <strong>216</strong>
            </div>

            <div className="member-mini-card">
              <span>Volunteers</span>

              <strong>32</strong>
            </div>

            <div className="member-mini-card">
              <span>Coordinators</span>

              <strong>12</strong>
            </div>
          </div>

          {/* ============================================================
              MEMBERS TABLE
              ============================================================ */}

          <section className="clubops-card members-card">

            {/* ----------------------------------------------------------
                TOOLBAR
                ---------------------------------------------------------- */}

            <div className="members-toolbar">

              {/* Search */}

              <div className="members-search">
                <span>⌕</span>

                <input
                  type="search"
                  value={search}
                  onChange={(event) => {
                    setSearch(event.target.value);
                  }}
                  placeholder="Search members..."
                  aria-label="Search members"
                />
              </div>

              {/* Role filter */}

              <select
                value={role}
                onChange={(event) => {
                  setRole(event.target.value);
                }}
                aria-label="Filter members by role"
              >
                <option value="All Roles">
                  All Roles
                </option>

                <option value="Member">
                  Member
                </option>

                <option value="Volunteer">
                  Volunteer
                </option>

                <option value="Coordinator">
                  Coordinator
                </option>
              </select>
            </div>

            {/* ----------------------------------------------------------
                TABLE
                ---------------------------------------------------------- */}

            <div className="members-table-wrapper">
              <table className="members-table">

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
                  {filteredMembers.map((member) => (
                    <tr key={member.email}>

                      {/* Member */}

                      <td>
                        <div className="member-person">

                          <div className="member-avatar">
                            {member.name.charAt(0)}
                          </div>

                          <div>
                            <strong>
                              {member.name}
                            </strong>

                            <span>
                              {member.role}
                            </span>
                          </div>

                        </div>
                      </td>

                      {/* Email */}

                      <td>
                        {member.email}
                      </td>

                      {/* Role */}

                      <td>
                        <span className="member-role">
                          {member.role}
                        </span>
                      </td>

                      {/* Status */}

                      <td>
                        <span className="member-status">

                          <i />

                          {member.status}

                        </span>
                      </td>

                      {/* Action */}

                      <td>
                        <button
                          type="button"
                          className="member-view-button"
                        >
                          View
                        </button>
                      </td>

                    </tr>
                  ))}

                  {/* ----------------------------------------------------
                      EMPTY STATE
                      ---------------------------------------------------- */}

                  {filteredMembers.length === 0 && (
                    <tr>
                      <td
                        colSpan={5}
                        className="members-empty"
                      >
                        No members found.
                      </td>
                    </tr>
                  )}

                </tbody>

              </table>
            </div>

          </section>
        </section>
      </main>
    </div>
  );
}