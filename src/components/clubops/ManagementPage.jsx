"use client";

import { useEffect, useMemo, useState } from "react";

import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";

import {
  formatDate,
  getWorkspace,
} from "@/lib/clubops";

import styles from "./ManagementPage.module.css";

const CONFIG = {
  members: {
    table: "members",
    title: "Members",
    eyebrow: "TEAM",
    description:
      "Manage volunteers, coordinators and club members.",
    fields: [
      ["name", "Full name", "text", true],
      ["email", "Email", "email", true],
      ["phone", "Phone", "text", false],
      ["role", "Role", "select", false, [
        "Member",
        "Volunteer",
        "Coordinator",
        "Admin",
      ]],
      ["department", "Department", "text", false],
      ["availability", "Availability", "text", false],
      ["skills", "Skills", "text", false],
    ],
    columns: [
      ["name", "Member"],
      ["email", "Email"],
      ["role", "Role"],
      ["department", "Department"],
      ["availability", "Availability"],
    ],
  },

  events: {
    table: "events",
    title: "Events",
    eyebrow: "EVENT MANAGEMENT",
    description:
      "Plan events, expected students, activities and logistics.",
    fields: [
      ["name", "Event name", "text", true],
      ["event_date", "Event date", "date", true],
      ["start_time", "Start time", "time", false],
      ["end_time", "End time", "time", false],
      ["location", "Location", "text", false],
      ["expected_students", "Expected students", "number", false],
      ["activities", "Activities", "textarea", false],
      ["description", "Description", "textarea", false],
      ["status", "Status", "select", false, [
        "Upcoming",
        "Ongoing",
        "Completed",
        "Cancelled",
      ]],
    ],
    columns: [
      ["name", "Event"],
      ["event_date", "Date"],
      ["location", "Location"],
      ["expected_students", "Students"],
      ["status", "Status"],
    ],
  },

  tasks: {
    table: "tasks",
    title: "Tasks",
    eyebrow: "TASK MANAGEMENT",
    description:
      "Assign work, set deadlines, priorities and track progress.",
    fields: [
      ["title", "Task title", "text", true],
      ["description", "Description", "textarea", false],
      ["priority", "Priority", "select", false, [
        "Low",
        "Medium",
        "High",
      ]],
      ["status", "Status", "select", false, [
        "Pending",
        "In Progress",
        "Completed",
      ]],
      ["due_date", "Deadline", "date", false],
      ["assigned_to", "Assign volunteer", "select-user", false],
    ],
    columns: [
      ["title", "Task"],
      ["priority", "Priority"],
      ["status", "Status"],
      ["due_date", "Deadline"],
      ["assigned_name", "Assigned"],
    ],
  },

  meetings: {
    table: "meetings",
    title: "Meetings",
    eyebrow: "MEETING INTELLIGENCE",
    description:
      "Schedule meetings, agendas, notes and action items.",
    fields: [
      ["title", "Meeting title", "text", true],
      ["meeting_date", "Date", "date", true],
      ["start_time", "Start time", "time", false],
      ["end_time", "End time", "time", false],
      ["location", "Location", "text", false],
      ["meeting_link", "Meeting link", "url", false],
      ["agenda", "Agenda", "textarea", false],
      ["notes", "Notes", "textarea", false],
      ["action_items", "Action items", "textarea", false],
      ["status", "Status", "select", false, [
        "scheduled",
        "ongoing",
        "completed",
        "cancelled",
      ]],
    ],
    columns: [
      ["title", "Meeting"],
      ["meeting_date", "Date"],
      ["start_time", "Time"],
      ["location", "Location"],
      ["status", "Status"],
    ],
  },

  documents: {
    table: "documents",
    title: "Documents",
    eyebrow: "KNOWLEDGE REPOSITORY",
    description:
      "Store important club documents and required event files.",
    fields: [
      ["title", "Document title", "text", true],
      ["description", "Description", "textarea", false],
      ["file_url", "File URL", "url", false],
      ["file_name", "File name", "text", false],
      ["file_type", "File type", "text", false],
      ["required", "Required document", "checkbox", false],
    ],
    columns: [
      ["title", "Document"],
      ["file_type", "Type"],
      ["file_name", "File"],
      ["required", "Required"],
    ],
  },

  announcements: {
    table: "announcements",
    title: "Announcements",
    eyebrow: "COMMUNICATION",
    description:
      "Publish announcements to your club.",
    fields: [
      ["title", "Title", "text", true],
      ["content", "Message", "textarea", true],
      ["priority", "Priority", "select", false, [
        "low",
        "normal",
        "high",
        "urgent",
      ]],
      ["status", "Status", "select", false, [
        "draft",
        "published",
        "archived",
      ]],
    ],
    columns: [
      ["title", "Title"],
      ["priority", "Priority"],
      ["status", "Status"],
      ["created_at", "Created"],
    ],
  },
};

function emptyForm(config) {
  const value = {};

  config.fields.forEach(([name]) => {
    value[name] = "";
  });

  return value;
}

export default function ManagementPage({
  resource,
}) {
  const config = CONFIG[resource];

  const [workspace, setWorkspace] = useState(null);
  const [records, setRecords] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [form, setForm] = useState(
    emptyForm(config)
  );

  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    load();
  }, [resource]);

  async function load() {
    setLoading(true);

    try {
      const workspaceData = await getWorkspace();

      setWorkspace(workspaceData);

      const supabase = (
        await import("@/lib/supabase/client")
      ).createClient();

      const query = supabase
        .from(config.table)
        .select("*")
        .eq("club_id", workspaceData.clubId)
        .order("created_at", {
          ascending: false,
        });

      const { data, error } = await query;

      if (error) throw error;

      let rows = data || [];

      if (resource === "tasks") {
        const assignedIds = rows
          .map((row) => row.assigned_to)
          .filter(Boolean);

        if (assignedIds.length) {
          const { data: memberData } =
            await supabase
              .from("members")
              .select("user_id,name")
              .in("user_id", assignedIds);

          const map = new Map(
            (memberData || []).map((item) => [
              item.user_id,
              item.name,
            ])
          );

          rows = rows.map((row) => ({
            ...row,
            assigned_name:
              map.get(row.assigned_to) || "Unassigned",
          }));
        }
      }

      setRecords(rows);

      if (
        resource === "tasks" ||
        resource === "events"
      ) {
        const { data: members } =
          await supabase
            .from("members")
            .select(
              "user_id,name,email,role,availability,skills"
            )
            .eq("club_id", workspaceData.clubId)
            .eq("status", "Active");

        setVolunteers(
          (members || []).filter(
            (member) =>
              member.role === "Volunteer" ||
              member.role === "Coordinator"
          )
        );
      }
    } catch (error) {
      console.error(error);
      setMessage(
        error?.message ||
          "Unable to load records."
      );
    } finally {
      setLoading(false);
    }
  }

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return records;

    return records.filter((record) =>
      Object.values(record).some((value) =>
        String(value ?? "")
          .toLowerCase()
          .includes(query)
      )
    );
  }, [records, search]);

  function updateField(name, value) {
    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    setMessage("");
  }

  async function save(event) {
    event.preventDefault();

    for (const field of config.fields) {
      if (
        field[3] &&
        !String(form[field[0]] || "").trim()
      ) {
        setMessage(
          `${field[1]} is required.`
        );
        return;
      }
    }

    try {
      setSaving(true);

      const supabase = (
        await import("@/lib/supabase/client")
      ).createClient();

      const payload = {
        ...form,
        club_id: workspace.clubId,
      };

      delete payload.assigned_name;

      if (resource === "tasks") {
        payload.created_by =
          workspace.user.id;

        if (!payload.assigned_to) {
          payload.assigned_to = null;
        }
      }

      if (resource === "events") {
        payload.created_by =
          workspace.user.id;
      }

      if (resource === "meetings") {
        payload.created_by =
          workspace.user.id;
      }

      if (resource === "documents") {
        payload.uploaded_by =
          workspace.user.id;
      }

      if (resource === "announcements") {
        payload.created_by =
          workspace.user.id;

        if (payload.status === "published") {
          payload.published_at =
            new Date().toISOString();
        }
      }

      if (resource === "members") {
        payload.skills = String(
          payload.skills || ""
        )
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean);
      }

      if (
        resource === "members" &&
        !payload.status
      ) {
        payload.status = "Active";
      }

      const { error } = await supabase
        .from(config.table)
        .insert(payload);

      if (error) throw error;

      setForm(emptyForm(config));
      setShowForm(false);
      setMessage(
        `${config.title.slice(0, -1)} created successfully.`
      );

      await load();
    } catch (error) {
      console.error(error);
      setMessage(
        error?.message ||
          "Unable to save the record."
      );
    } finally {
      setSaving(false);
    }
  }

  async function remove(id) {
    if (
      !window.confirm(
        "Delete this record?"
      )
    ) {
      return;
    }

    try {
      const supabase = (
        await import("@/lib/supabase/client")
      ).createClient();

      const { error } = await supabase
        .from(config.table)
        .delete()
        .eq("id", id);

      if (error) throw error;

      await load();
    } catch (error) {
      setMessage(
        error?.message ||
          "Unable to delete record."
      );
    }
  }

  async function updateTaskStatus(
    id,
    status
  ) {
    if (resource !== "tasks") return;

    const supabase = (
      await import("@/lib/supabase/client")
    ).createClient();

    const { error } = await supabase
      .from("tasks")
      .update({ status })
      .eq("id", id);

    if (error) {
      setMessage(error.message);
      return;
    }

    await load();
  }

  if (loading) {
    return (
      <div className="clubops-dashboard-loading">
        Loading {config.title.toLowerCase()}...
      </div>
    );
  }

  return (
    <div className="clubops-dashboard">
      <Sidebar />

      <main className="clubops-main">
        <Topbar />

        <section className="clubops-content">

          <div className={styles.header}>
            <div>
              <span>{config.eyebrow}</span>
              <h2>{config.title}</h2>
              <p>{config.description}</p>
            </div>

            <button
              className="clubops-primary-button"
              onClick={() =>
                setShowForm(!showForm)
              }
            >
              {showForm
                ? "Close"
                : `+ Add ${config.title.slice(0, -1)}`}
            </button>
          </div>

          {message && (
            <div className={styles.message}>
              {message}
            </div>
          )}

          {showForm && (
            <section className={styles.formCard}>
              <h3>
                New {config.title.slice(0, -1)}
              </h3>

              <form onSubmit={save}>
                <div className={styles.formGrid}>

                  {config.fields.map(
                    (field) => {
                      const [
                        name,
                        label,
                        type,
                        required,
                        options,
                      ] = field;

                      if (type === "checkbox") {
                        return (
                          <label
                            key={name}
                            className={
                              styles.checkbox
                            }
                          >
                            <input
                              type="checkbox"
                              checked={
                                form[name] === true
                              }
                              onChange={(e) =>
                                updateField(
                                  name,
                                  e.target.checked
                                )
                              }
                            />

                            {label}
                          </label>
                        );
                      }

                      return (
                        <label
                          key={name}
                          className={
                            type === "textarea"
                              ? styles.full
                              : ""
                          }
                        >
                          {label}
                          {required && " *"}

                          {type ===
                          "select-user" ? (
                            <select
                              value={
                                form[name]
                              }
                              onChange={(e) =>
                                updateField(
                                  name,
                                  e.target.value
                                )
                              }
                            >
                              <option value="">
                                Select volunteer
                              </option>

                              {volunteers.map(
                                (person) => (
                                  <option
                                    key={
                                      person.user_id
                                    }
                                    value={
                                      person.user_id
                                    }
                                  >
                                    {person.name}
                                    {person.availability
                                      ? ` — ${person.availability}`
                                      : ""}
                                  </option>
                                )
                              )}
                            </select>
                          ) : type ===
                            "select" ? (
                            <select
                              value={
                                form[name]
                              }
                              onChange={(e) =>
                                updateField(
                                  name,
                                  e.target.value
                                )
                              }
                            >
                              <option value="">
                                Select...
                              </option>

                              {options.map(
                                (option) => (
                                  <option
                                    key={option}
                                    value={option}
                                  >
                                    {option}
                                  </option>
                                )
                              )}
                            </select>
                          ) : type ===
                            "textarea" ? (
                            <textarea
                              value={
                                form[name]
                              }
                              onChange={(e) =>
                                updateField(
                                  name,
                                  e.target.value
                                )
                              }
                              rows={4}
                            />
                          ) : (
                            <input
                              type={type}
                              value={
                                form[name]
                              }
                              onChange={(e) =>
                                updateField(
                                  name,
                                  e.target.value
                                )
                              }
                            />
                          )}
                        </label>
                      );
                    }
                  )}

                </div>

                <div className={styles.formActions}>
                  <button
                    type="button"
                    className="clubops-secondary-button"
                    onClick={() => {
                      setShowForm(false);
                      setForm(emptyForm(config));
                    }}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="clubops-primary-button"
                    disabled={saving}
                  >
                    {saving
                      ? "Saving..."
                      : "Save"}
                  </button>
                </div>
              </form>
            </section>
          )}

          <section className={styles.tableCard}>

            <div className={styles.toolbar}>
              <div>
                <strong>
                  {filtered.length}
                </strong>

                <span>
                  {" "}
                  {config.title.toLowerCase()}
                </span>
              </div>

              <input
                type="search"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder={`Search ${config.title.toLowerCase()}...`}
              />
            </div>

            {filtered.length === 0 ? (
              <div className={styles.empty}>
                <div>0</div>
                <h3>
                  No {config.title.toLowerCase()} yet
                </h3>
                <p>
                  This workspace starts empty.
                  Create your first record above.
                </p>
              </div>
            ) : (
              <div className={styles.tableWrap}>
                <table>
                  <thead>
                    <tr>
                      {config.columns.map(
                        ([, label]) => (
                          <th key={label}>
                            {label}
                          </th>
                        )
                      )}

                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filtered.map(
                      (record) => (
                        <tr key={record.id}>

                          {config.columns.map(
                            ([key]) => (
                              <td key={key}>
                                {key ===
                                "event_date" ||
                                key ===
                                "due_date" ||
                                key ===
                                "meeting_date"
                                  ? formatDate(
                                      record[key]
                                    )
                                  : key ===
                                    "created_at"
                                  ? formatDate(
                                      record[key]
                                    )
                                  : key ===
                                    "required"
                                  ? record[key]
                                    ? "Yes"
                                    : "No"
                                  : record[key] ||
                                    "—"}
                              </td>
                            )
                          )}

                          <td>
                            {resource ===
                              "tasks" && (
                              <select
                                value={
                                  record.status
                                }
                                onChange={(e) =>
                                  updateTaskStatus(
                                    record.id,
                                    e.target.value
                                  )
                                }
                              >
                                <option>
                                  Pending
                                </option>
                                <option>
                                  In Progress
                                </option>
                                <option>
                                  Completed
                                </option>
                              </select>
                            )}

                            <button
                              className={
                                styles.delete
                              }
                              onClick={() =>
                                remove(
                                  record.id
                                )
                              }
                            >
                              Delete
                            </button>
                          </td>

                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            )}

          </section>
        </section>
      </main>
    </div>
  );
}