"use client";

import { useEffect, useMemo, useState } from "react";

import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";

import {
  formatDate,
  formatTime,
  getWorkspace,
} from "@/lib/clubops";

import styles from "./ManagementPage.module.css";

const CONFIG = {
  members: {
    table: "members",

    title: "Members",

    singular: "Member",

    eyebrow: "TEAM",

    description:
      "Manage the people who are part of your club workspace.",

    fields: [
      ["name", "Full name", "text", true],
      ["email", "Email", "email", true],
      ["phone", "Phone", "text", false],
      [
        "role",
        "Role",
        "select",
        false,
        [
          "Member",
          "Volunteer",
          "Coordinator",
          "Admin",
        ],
      ],
      [
        "status",
        "Status",
        "select",
        false,
        [
          "Active",
          "Inactive",
        ],
      ],
    ],

    columns: [
      ["name", "Member"],
      ["email", "Email"],
      ["role", "Role"],
      ["status", "Status"],
      ["phone", "Phone"],
    ],
  },

  events: {
    table: "events",

    title: "Events",

    singular: "Event",

    eyebrow: "EVENT MANAGEMENT",

    description:
      "Create and manage every club event from one workspace.",

    fields: [
      ["name", "Event name", "text", true],
      ["description", "Description", "textarea", false],
      ["event_date", "Event date", "date", true],
      ["start_time", "Start time", "time", false],
      ["end_time", "End time", "time", false],
      ["location", "Location", "text", false],
      [
        "status",
        "Status",
        "select",
        false,
        [
          "Upcoming",
          "Ongoing",
          "Completed",
          "Cancelled",
        ],
      ],
    ],

    columns: [
      ["name", "Event"],
      ["event_date", "Date"],
      ["start_time", "Time"],
      ["location", "Location"],
      ["status", "Status"],
    ],
  },

  tasks: {
    table: "tasks",

    title: "Tasks",

    singular: "Task",

    eyebrow: "TASK MANAGEMENT",

    description:
      "Assign work, manage priorities and track completion.",

    fields: [
      ["title", "Task title", "text", true],
      ["description", "Description", "textarea", false],
      [
        "priority",
        "Priority",
        "select",
        false,
        [
          "Low",
          "Medium",
          "High",
        ],
      ],
      [
        "status",
        "Status",
        "select",
        false,
        [
          "Pending",
          "In Progress",
          "Completed",
        ],
      ],
      ["due_date", "Deadline", "date", false],
      [
        "assigned_to",
        "Assign volunteer",
        "select-user",
        false,
      ],
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

    singular: "Meeting",

    eyebrow: "MEETING MANAGEMENT",

    description:
      "Schedule and organize club coordination meetings.",

    fields: [
      ["title", "Meeting title", "text", true],
      ["description", "Description", "textarea", false],
      ["meeting_date", "Date", "date", true],
      ["start_time", "Start time", "time", false],
      ["end_time", "End time", "time", false],
      ["location", "Location", "text", false],
      ["meeting_link", "Meeting link", "url", false],
      [
        "status",
        "Status",
        "select",
        false,
        [
          "scheduled",
          "ongoing",
          "completed",
          "cancelled",
        ],
      ],
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

    singular: "Document",

    eyebrow: "KNOWLEDGE REPOSITORY",

    description:
      "Keep important club documents and links organized.",

    fields: [
      ["title", "Document title", "text", true],
      ["description", "Description", "textarea", false],
      ["file_url", "File URL", "url", false],
      ["file_name", "File name", "text", false],
      ["file_type", "File type", "text", false],
      ["file_size", "File size", "number", false],
    ],

    columns: [
      ["title", "Document"],
      ["file_type", "Type"],
      ["file_name", "File"],
      ["created_at", "Created"],
    ],
  },

  announcements: {
    table: "announcements",

    title: "Announcements",

    singular: "Announcement",

    eyebrow: "COMMUNICATION",

    description:
      "Publish important updates for your club.",

    fields: [
      ["title", "Title", "text", true],
      ["content", "Message", "textarea", true],
      [
        "priority",
        "Priority",
        "select",
        false,
        [
          "low",
          "normal",
          "high",
          "urgent",
        ],
      ],
      [
        "status",
        "Status",
        "select",
        false,
        [
          "draft",
          "published",
          "archived",
        ],
      ],
    ],

    columns: [
      ["title", "Title"],
      ["priority", "Priority"],
      ["status", "Status"],
      ["created_at", "Created"],
    ],
  },

  attendance: {
    table: "attendance",

    title: "Attendance",

    singular: "Attendance",

    eyebrow: "PARTICIPATION",

    description:
      "Record member participation for club events.",

    fields: [
      [
        "member_id",
        "Member",
        "select-member",
        true,
      ],

      [
        "event_id",
        "Event",
        "select-event",
        true,
      ],

      [
        "attendance_date",
        "Attendance date",
        "date",
        true,
      ],

      [
        "status",
        "Status",
        "select",
        false,
        [
          "Present",
          "Absent",
          "Late",
          "Excused",
        ],
      ],
    ],

    columns: [
      ["member_name", "Member"],
      ["event_name", "Event"],
      ["attendance_date", "Date"],
      ["status", "Status"],
    ],
  },
};

function emptyForm(config) {
  const value = {};

  if (!config?.fields) {
    return value;
  }

  config.fields.forEach(([name]) => {
    value[name] = "";
  });

  return value;
}

export default function ManagementPage({
  resource,
}) {
  const config = CONFIG[resource];

  const [workspace, setWorkspace] =
    useState(null);

  const [records, setRecords] =
    useState([]);

  const [members, setMembers] =
    useState([]);

  const [events, setEvents] =
    useState([]);

  const [form, setForm] =
    useState(() => emptyForm(config));

  const [showForm, setShowForm] =
    useState(false);

  const [search, setSearch] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [message, setMessage] =
    useState("");

  useEffect(() => {
    setForm(emptyForm(config));

    load();
  }, [resource]);

  async function load() {
    if (!config) {
      setLoading(false);
      setMessage(
        "This management page does not exist."
      );
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const workspaceData =
        await getWorkspace();

      setWorkspace(workspaceData);

      const supabase =
        (await import(
          "@/lib/supabase/client"
        )).createClient();

      const clubId =
        workspaceData?.clubId;

      if (!clubId) {
        throw new Error(
          "No club workspace was found."
        );
      }

      if (resource === "attendance") {
        await loadAttendance(
          supabase,
          clubId
        );

        await loadMembers(
          supabase,
          clubId
        );

        await loadEvents(
          supabase,
          clubId
        );
      } else {
        const { data, error } =
          await supabase
            .from(config.table)
            .select("*")
            .eq("club_id", clubId)
            .order("created_at", {
              ascending: false,
            });

        if (error) {
          throw error;
        }

        let rows = data || [];

        if (resource === "tasks") {
          rows =
            await attachTaskNames(
              supabase,
              rows
            );

          await loadMembers(
            supabase,
            clubId
          );
        }

        setRecords(rows);
      }

      if (
        resource === "events"
      ) {
        await loadMembers(
          supabase,
          clubId
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

  async function loadMembers(
    supabase,
    clubId
  ) {
    const { data, error } =
      await supabase
        .from("members")
        .select(
          "id,name,email,role,status,user_id"
        )
        .eq("club_id", clubId)
        .eq("status", "Active")
        .order("name");

    if (error) {
      throw error;
    }

    setMembers(data || []);
  }

  async function loadEvents(
    supabase,
    clubId
  ) {
    const { data, error } =
      await supabase
        .from("events")
        .select(
          "id,name,event_date,status"
        )
        .eq("club_id", clubId)
        .order("event_date", {
          ascending: true,
        });

    if (error) {
      throw error;
    }

    setEvents(data || []);
  }

  async function loadAttendance(
    supabase,
    clubId
  ) {
    const { data, error } =
      await supabase
        .from("attendance")
        .select(
          "id,member_id,event_id,status,attendance_date,marked_by"
        )
        .in(
          "member_id",
          await getClubMemberIds(
            supabase,
            clubId
          )
        )
        .order("attendance_date", {
          ascending: false,
        });

    if (error) {
      throw error;
    }

    const memberIds =
      (data || [])
        .map((row) => row.member_id)
        .filter(Boolean);

    const eventIds =
      (data || [])
        .map((row) => row.event_id)
        .filter(Boolean);

    let memberMap =
      new Map();

    let eventMap =
      new Map();

    if (memberIds.length) {
      const { data: memberRows } =
        await supabase
          .from("members")
          .select("id,name")
          .in("id", memberIds);

      memberMap = new Map(
        (memberRows || []).map(
          (item) => [
            item.id,
            item.name,
          ]
        )
      );
    }

    if (eventIds.length) {
      const { data: eventRows } =
        await supabase
          .from("events")
          .select("id,name")
          .in("id", eventIds);

      eventMap = new Map(
        (eventRows || []).map(
          (item) => [
            item.id,
            item.name,
          ]
        )
      );
    }

    setRecords(
      (data || []).map(
        (row) => ({
          ...row,
          member_name:
            memberMap.get(
              row.member_id
            ) || "Unknown member",
          event_name:
            eventMap.get(
              row.event_id
            ) || "Unknown event",
        })
      )
    );
  }

  async function getClubMemberIds(
    supabase,
    clubId
  ) {
    const { data, error } =
      await supabase
        .from("members")
        .select("id")
        .eq("club_id", clubId);

    if (error) {
      throw error;
    }

    return (data || [])
      .map((item) => item.id)
      .filter(Boolean);
  }

  async function attachTaskNames(
    supabase,
    rows
  ) {
    const ids = rows
      .map(
        (row) =>
          row.assigned_to
      )
      .filter(Boolean);

    if (!ids.length) {
      return rows.map(
        (row) => ({
          ...row,
          assigned_name:
            "Unassigned",
        })
      );
    }

    const { data } =
      await supabase
        .from("members")
        .select(
          "user_id,name"
        )
        .in(
          "user_id",
          ids
        );

    const map = new Map(
      (data || []).map(
        (item) => [
          item.user_id,
          item.name,
        ]
      )
    );

    return rows.map(
      (row) => ({
        ...row,
        assigned_name:
          map.get(
            row.assigned_to
          ) ||
          "Unassigned",
      })
    );
  }

  const filtered = useMemo(() => {
    const query =
      search
        .trim()
        .toLowerCase();

    if (!query) {
      return records;
    }

    return records.filter(
      (record) =>
        Object.values(record).some(
          (value) =>
            String(
              value ?? ""
            )
              .toLowerCase()
              .includes(query)
        )
    );
  }, [records, search]);

  function updateField(
    name,
    value
  ) {
    setForm(
      (current) => ({
        ...current,
        [name]: value,
      })
    );

    setMessage("");
  }

  async function save(event) {
    event.preventDefault();

    if (!workspace?.clubId) {
      setMessage(
        "Workspace is not ready."
      );
      return;
    }

    for (const field of config.fields) {
      const [
        name,
        label,
        ,
        required,
      ] = field;

      if (
        required &&
        !String(
          form[name] || ""
        ).trim()
      ) {
        setMessage(
          `${label} is required.`
        );

        return;
      }
    }

    try {
      setSaving(true);
      setMessage("");

      const supabase =
        (await import(
          "@/lib/supabase/client"
        )).createClient();

      let payload = {
        ...form,
        club_id:
          workspace.clubId,
      };

      if (
        resource === "members"
      ) {
        payload = {
          name: payload.name,
          email: payload.email,
          phone:
            payload.phone ||
            null,
          role:
            payload.role ||
            "Member",
          status:
            payload.status ||
            "Active",
          club_id:
            workspace.clubId,
        };
      }

      if (
        resource === "events"
      ) {
        payload = {
          name: payload.name,
          description:
            payload.description ||
            null,
          event_date:
            payload.event_date,
          start_time:
            payload.start_time ||
            null,
          end_time:
            payload.end_time ||
            null,
          location:
            payload.location ||
            null,
          status:
            payload.status ||
            "Upcoming",
          club_id:
            workspace.clubId,
          created_by:
            workspace.user.id,
        };
      }

      if (
        resource === "tasks"
      ) {
        payload = {
          title:
            payload.title,
          description:
            payload.description ||
            null,
          priority:
            payload.priority ||
            "Medium",
          status:
            payload.status ||
            "Pending",
          due_date:
            payload.due_date ||
            null,
          assigned_to:
            payload.assigned_to ||
            null,
          club_id:
            workspace.clubId,
          created_by:
            workspace.user.id,
        };
      }

      if (
        resource === "meetings"
      ) {
        payload = {
          title:
            payload.title,
          description:
            payload.description ||
            null,
          meeting_date:
            payload.meeting_date,
          start_time:
            payload.start_time ||
            null,
          end_time:
            payload.end_time ||
            null,
          location:
            payload.location ||
            null,
          meeting_link:
            payload.meeting_link ||
            null,
          status:
            payload.status ||
            "scheduled",
          club_id:
            workspace.clubId,
          created_by:
            workspace.user.id,
        };
      }

      if (
        resource === "documents"
      ) {
        payload = {
          title:
            payload.title,
          description:
            payload.description ||
            null,
          file_url:
            payload.file_url ||
            null,
          file_name:
            payload.file_name ||
            null,
          file_type:
            payload.file_type ||
            null,
          file_size:
            payload.file_size
              ? Number(
                  payload.file_size
                )
              : null,
          club_id:
            workspace.clubId,
          uploaded_by:
            workspace.user.id,
        };
      }

      if (
        resource === "announcements"
      ) {
        payload = {
          title:
            payload.title,
          content:
            payload.content,
          priority:
            payload.priority ||
            "normal",
          status:
            payload.status ||
            "published",
          club_id:
            workspace.clubId,
          created_by:
            workspace.user.id,
          published_at:
            payload.status ===
            "published"
              ? new Date().toISOString()
              : null,
        };
      }

      if (
        resource === "attendance"
      ) {
        payload = {
          member_id:
            payload.member_id,
          event_id:
            payload.event_id,
          attendance_date:
            payload.attendance_date ||
            new Date()
              .toISOString()
              .slice(0, 10),
          status:
            payload.status ||
            "Present",
          marked_by:
            workspace.user.id,
        };
      }

      const { error } =
        await supabase
          .from(config.table)
          .insert(payload);

      if (error) {
        throw error;
      }

      setForm(
        emptyForm(config)
      );

      setShowForm(false);

      setMessage(
        `${config.singular} created successfully.`
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
    if (!id) {
      return;
    }

    const confirmed =
      window.confirm(
        `Delete this ${config.singular.toLowerCase()}?`
      );

    if (!confirmed) {
      return;
    }

    try {
      const supabase =
        (await import(
          "@/lib/supabase/client"
        )).createClient();

      const { error } =
        await supabase
          .from(config.table)
          .delete()
          .eq("id", id);

      if (error) {
        throw error;
      }

      setMessage(
        `${config.singular} deleted.`
      );

      await load();
    } catch (error) {
      console.error(error);

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
    if (
      resource !== "tasks" ||
      !id
    ) {
      return;
    }

    try {
      const supabase =
        (await import(
          "@/lib/supabase/client"
        )).createClient();

      const { error } =
        await supabase
          .from("tasks")
          .update({ status })
          .eq("id", id);

      if (error) {
        throw error;
      }

      await load();
    } catch (error) {
      setMessage(
        error?.message ||
          "Unable to update task."
      );
    }
  }

  if (!config) {
    return (
      <div className="clubops-dashboard-loading">
        Unknown management resource.
      </div>
    );
  }

  if (loading) {
    return (
      <div className="clubops-dashboard-loading">
        <div className="clubops-loading-spinner" />

        <strong>
          Loading {config.title.toLowerCase()}
          ...
        </strong>

        <span>
          Connecting to your club workspace
        </span>
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
              <span>
                {config.eyebrow}
              </span>

              <h2>
                {config.title}
              </h2>

              <p>
                {config.description}
              </p>
            </div>

            <button
              type="button"
              className="clubops-primary-button"
              onClick={() => {
                setShowForm(
                  (value) => !value
                );

                setForm(
                  emptyForm(config)
                );

                setMessage("");
              }}
            >
              {showForm
                ? "Close"
                : `+ Add ${config.singular}`}
            </button>
          </div>

          {message && (
            <div
              className={
                styles.message
              }
            >
              {message}
            </div>
          )}

          {showForm && (
            <section
              className={
                styles.formCard
              }
            >
              <div
                className={
                  styles.formHeading
                }
              >
                <div>
                  <span>
                    NEW RECORD
                  </span>

                  <h3>
                    Create{" "}
                    {config.singular}
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setForm(
                      emptyForm(config)
                    );
                  }}
                >
                  ×
                </button>
              </div>

              <form onSubmit={save}>
                <div
                  className={
                    styles.formGrid
                  }
                >
                  {config.fields.map(
                    (field) => {
                      const [
                        name,
                        label,
                        type,
                        required,
                        options,
                      ] = field;

                      const isFull =
                        type ===
                          "textarea" ||
                        type ===
                          "select-member" ||
                        type ===
                          "select-event";

                      return (
                        <label
                          key={name}
                          className={
                            isFull
                              ? styles.full
                              : ""
                          }
                        >
                          <span>
                            {label}
                            {required &&
                              " *"}
                          </span>

                          {type ===
                          "select-user" ? (
                            <select
                              value={
                                form[
                                  name
                                ] || ""
                              }
                              onChange={(
                                event
                              ) =>
                                updateField(
                                  name,
                                  event
                                    .target
                                    .value
                                )
                              }
                            >
                              <option value="">
                                Select volunteer
                              </option>

                              {members
                                .filter(
                                  (
                                    person
                                  ) =>
                                    person.user_id
                                )
                                .map(
                                  (
                                    person
                                  ) => (
                                    <option
                                      key={
                                        person.user_id
                                      }
                                      value={
                                        person.user_id
                                      }
                                    >
                                      {
                                        person.name
                                      }{" "}
                                      ·{" "}
                                      {
                                        person.role
                                      }
                                    </option>
                                  )
                                )}
                            </select>
                          ) : type ===
                            "select-member" ? (
                            <select
                              value={
                                form[
                                  name
                                ] || ""
                              }
                              onChange={(
                                event
                              ) =>
                                updateField(
                                  name,
                                  event
                                    .target
                                    .value
                                )
                              }
                            >
                              <option value="">
                                Select member
                              </option>

                              {members.map(
                                (
                                  person
                                ) => (
                                  <option
                                    key={
                                      person.id
                                    }
                                    value={
                                      person.id
                                    }
                                  >
                                    {
                                      person.name
                                    }{" "}
                                    ·{" "}
                                    {
                                      person.role
                                    }
                                  </option>
                                )
                              )}
                            </select>
                          ) : type ===
                            "select-event" ? (
                            <select
                              value={
                                form[
                                  name
                                ] || ""
                              }
                              onChange={(
                                event
                              ) =>
                                updateField(
                                  name,
                                  event
                                    .target
                                    .value
                                )
                              }
                            >
                              <option value="">
                                Select event
                              </option>

                              {events.map(
                                (
                                  event
                                ) => (
                                  <option
                                    key={
                                      event.id
                                    }
                                    value={
                                      event.id
                                    }
                                  >
                                    {
                                      event.name
                                    }{" "}
                                    ·{" "}
                                    {formatDate(
                                      event.event_date
                                    )}
                                  </option>
                                )
                              )}
                            </select>
                          ) : type ===
                            "select" ? (
                            <select
                              value={
                                form[
                                  name
                                ] || ""
                              }
                              onChange={(
                                event
                              ) =>
                                updateField(
                                  name,
                                  event
                                    .target
                                    .value
                                )
                              }
                            >
                              <option value="">
                                Select...
                              </option>

                              {options.map(
                                (
                                  option
                                ) => (
                                  <option
                                    key={
                                      option
                                    }
                                    value={
                                      option
                                    }
                                  >
                                    {
                                      option
                                    }
                                  </option>
                                )
                              )}
                            </select>
                          ) : type ===
                            "textarea" ? (
                            <textarea
                              rows={5}
                              value={
                                form[
                                  name
                                ] || ""
                              }
                              onChange={(
                                event
                              ) =>
                                updateField(
                                  name,
                                  event
                                    .target
                                    .value
                                )
                              }
                            />
                          ) : (
                            <input
                              type={type}
                              value={
                                form[
                                  name
                                ] || ""
                              }
                              onChange={(
                                event
                              ) =>
                                updateField(
                                  name,
                                  event
                                    .target
                                    .value
                                )
                              }
                            />
                          )}
                        </label>
                      );
                    }
                  )}
                </div>

                <div
                  className={
                    styles.formActions
                  }
                >
                  <button
                    type="button"
                    className="clubops-secondary-button"
                    onClick={() => {
                      setShowForm(false);
                      setForm(
                        emptyForm(config)
                      );
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
                      : `Create ${config.singular}`}
                  </button>
                </div>
              </form>
            </section>
          )}

          <section
            className={
              styles.tableCard
            }
          >
            <div
              className={
                styles.toolbar
              }
            >
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
                onChange={(event) =>
                  setSearch(
                    event.target.value
                  )
                }
                placeholder={`Search ${config.title.toLowerCase()}...`}
              />
            </div>

            {filtered.length ===
            0 ? (
              <div
                className={
                  styles.empty
                }
              >
                <div
                  className={
                    styles.emptyIcon
                  }
                >
                  {resource ===
                  "attendance"
                    ? "✓"
                    : "+"}
                </div>

                <h3>
                  No{" "}
                  {config.title.toLowerCase()}{" "}
                  yet
                </h3>

                <p>
                  Create your first{" "}
                  {config.singular.toLowerCase()}{" "}
                  using the button above.
                </p>

                <button
                  type="button"
                  className="clubops-primary-button"
                  onClick={() => {
                    setShowForm(true);
                    setForm(
                      emptyForm(config)
                    );
                  }}
                >
                  + Create{" "}
                  {config.singular}
                </button>
              </div>
            ) : (
              <div
                className={
                  styles.tableWrap
                }
              >
                <table>
                  <thead>
                    <tr>
                      {config.columns.map(
                        ([key, label]) => (
                          <th key={key}>
                            {label}
                          </th>
                        )
                      )}

                      <th>
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {filtered.map(
                      (record) => (
                        <tr
                          key={
                            record.id
                          }
                        >
                          {config.columns.map(
                            ([key]) => (
                              <td key={key}>
                                {key ===
                                  "event_date" ||
                                key ===
                                  "due_date" ||
                                key ===
                                  "meeting_date" ||
                                key ===
                                  "attendance_date" ||
                                key ===
                                  "created_at"
                                  ? formatDate(
                                      record[
                                        key
                                      ]
                                    )
                                  : key ===
                                    "start_time"
                                  ? formatTime(
                                      record[
                                        key
                                      ]
                                    )
                                  : key ===
                                    "required"
                                  ? record[
                                      key
                                    ]
                                    ? "Yes"
                                    : "No"
                                  : record[
                                      key
                                    ] ||
                                    "—"}
                              </td>
                            )
                          )}

                          <td>
                            {resource ===
                              "tasks" && (
                              <select
                                className={
                                  styles.inlineSelect
                                }
                                value={
                                  record.status
                                }
                                onChange={(
                                  event
                                ) =>
                                  updateTaskStatus(
                                    record.id,
                                    event
                                      .target
                                      .value
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
                              type="button"
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