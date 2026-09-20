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
  const [workspace, setWorkspace] =
    useState(null);

  const [events, setEvents] =
    useState([]);

  const [tasks, setTasks] =
    useState([]);

  const [meetings, setMeetings] =
    useState([]);

  const [announcements, setAnnouncements] =
    useState([]);

  const [members, setMembers] =
    useState([]);

  const [budget, setBudget] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      setLoading(true);
      setError("");

      const workspaceData =
        await getWorkspace();

      setWorkspace(workspaceData);

      const supabase =
        (await import(
          "@/lib/supabase/client"
        )).createClient();

      const clubId =
        workspaceData.clubId;

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
          .eq("club_id", clubId)
          .eq("status", "Active")
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

      setEvents(
        eventResult.data || []
      );

      setTasks(
        taskResult.data || []
      );

      setMeetings(
        meetingResult.data || []
      );

      setAnnouncements(
        announcementResult.data || []
      );

      setMembers(
        memberResult.data || []
      );

      setBudget(
        budgetResult.data || []
      );
    } catch (error) {
      console.error(error);

      setError(
        error?.message ||
          "Unable to load the dashboard."
      );
    } finally {
      setLoading(false);
    }
  }

  const today = useMemo(() => {
    const value = new Date();

    value.setHours(
      0,
      0,
      0,
      0
    );

    return value;
  }, []);

  const upcomingEvents =
    useMemo(
      () =>
        events.filter(
          (event) => {
            const date =
              new Date(
                `${event.event_date}T00:00:00`
              );

            return (
              date >= today &&
              event.status !==
                "Cancelled"
            );
          }
        ),
      [events, today]
    );

  const completedTasks =
    tasks.filter(
      (task) =>
        task.status ===
        "Completed"
    );

  const pendingTasks =
    tasks.filter(
      (task) =>
        task.status !==
        "Completed"
    );

  const overdueTasks =
    pendingTasks.filter(
      (task) => {
        if (!task.due_date) {
          return false;
        }

        return (
          new Date(
            `${task.due_date}T00:00:00`
          ) < today
        );
      }
    );

  const taskProgress =
    tasks.length
      ? Math.round(
          (completedTasks.length /
            tasks.length) *
            100
        )
      : 0;

  const totalBudget =
    budget.reduce(
      (sum, item) =>
        sum +
        Number(
          item.allocated_amount ||
            0
        ),
      0
    );

  const totalSpent =
    budget.reduce(
      (sum, item) =>
        sum +
        Number(
          item.spent_amount ||
            0
        ),
      0
    );

  const nextMeeting =
    meetings.find(
      (meeting) =>
        new Date(
          `${meeting.meeting_date}T00:00:00`
        ) >= today
    );

  if (loading) {
    return (
      <div
        className={
          styles.loadingPage
        }
      >
        <div
          className={
            styles.loadingOrb
          }
        >
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
    <div
      className={
        styles.dashboard
      }
    >
      <Sidebar />

      <main
        className={
          styles.main
        }
      >
        <Topbar />

        <div
          className={
            styles.content
          }
        >
          {error && (
            <div
              className={
                styles.error
              }
            >
              <strong>
                Dashboard error
              </strong>

              <span>
                {error}
              </span>

              <button
                type="button"
                onClick={
                  loadDashboard
                }
              >
                Retry
              </button>
            </div>
          )}

          <section
            className={
              styles.hero
            }
          >
            <div>
              <span
                className={
                  styles.eyebrow
                }
              >
                CLUBOPS AI · LIVE WORKSPACE
              </span>

              <h1>
                Welcome,{" "}
                {workspace?.profile
                  ?.full_name ||
                  "Club Member"}
                <span> 👋</span>
              </h1>

              <p>
                Your club operations at
                a glance. Everything here
                is connected to your live
                Supabase workspace.
              </p>
            </div>

            <div
              className={
                styles.roleCard
              }
            >
              <span>
                CURRENT ROLE
              </span>

              <strong>
                {workspace?.role ||
                  "VOLUNTEER"}
              </strong>

              <small>
                Workspace member
              </small>
            </div>
          </section>

          <section
            className={
              styles.stats
            }
          >
            <Stat
              icon="👥"
              label="Active Members"
              value={
                members.length
              }
              note="People in your workspace"
            />

            <Stat
              icon="◈"
              label="Upcoming Events"
              value={
                upcomingEvents.length
              }
              note="Scheduled events"
            />

            <Stat
              icon="✓"
              label="Pending Tasks"
              value={
                pendingTasks.length
              }
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
              value={formatMoney(
                totalBudget
              )}
              note={`${formatMoney(
                totalSpent
              )} spent`}
            />
          </section>

          <section
            className={
              styles.grid
            }
          >
            <div
              className={
                styles.panel
              }
            >
              <PanelHeader
                eyebrow="EVENT MANAGEMENT"
                title="Upcoming Events"
                href="/events"
              />

              {upcomingEvents.length ===
              0 ? (
                <EmptyState
                  icon="◈"
                  title="No upcoming events"
                  text="Create your first event to start planning club activities."
                  href="/events"
                  action="Create Event"
                />
              ) : (
                <div
                  className={
                    styles.eventList
                  }
                >
                  {upcomingEvents
                    .slice(0, 5)
                    .map(
                      (event) => (
                        <div
                          key={
                            event.id
                          }
                          className={
                            styles.eventRow
                          }
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
                                  month:
                                    "short",
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
                              {
                                event.name
                              }
                            </strong>

                            <p>
                              {event.location ||
                                "Location not set"}
                            </p>

                            <small>
                              {formatTime(
                                event.start_time
                              )}
                            </small>
                          </div>

                          <span
                            className={
                              styles.badge
                            }
                          >
                            {
                              event.status
                            }
                          </span>
                        </div>
                      )
                    )}
                </div>
              )}
            </div>

            <div
              className={
                styles.panel
              }
            >
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

              <div
                className={
                  styles.taskStats
                }
              >
                <div>
                  <strong>
                    {
                      completedTasks.length
                    }
                  </strong>

                  <span>
                    Completed
                  </span>
                </div>

                <div>
                  <strong>
                    {
                      pendingTasks.length
                    }
                  </strong>

                  <span>
                    Pending
                  </span>
                </div>

                <div>
                  <strong>
                    {
                      overdueTasks.length
                    }
                  </strong>

                  <span>
                    Overdue
                  </span>
                </div>
              </div>

              <div
                className={
                  styles.taskList
                }
              >
                {pendingTasks
                  .slice(0, 4)
                  .map(
                    (task) => (
                      <div
                        key={
                          task.id
                        }
                        className={
                          styles.taskRow
                        }
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
                            {
                              task.title
                            }
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
                              `priority${String(
                                task.priority ||
                                  "Medium"
                              )
                                .replace(
                                  /\s/g,
                                  ""
                                )
                                .toLowerCase()}`
                          }
                        >
                          {
                            task.priority
                          }
                        </em>
                      </div>
                    )
                  )}

                {pendingTasks.length ===
                  0 && (
                  <div
                    className={
                      styles.miniEmpty
                    }
                  >
                    All tasks are
                    completed.
                  </div>
                )}
              </div>
            </div>
          </section>

          <section
            className={
              styles.grid
            }
          >
            <div
              className={
                styles.panel
              }
            >
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
                      {
                        nextMeeting.title
                      }
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
                  href="/meetings"
                  action="Schedule Meeting"
                />
              )}
            </div>

            <div
              className={
                styles.panel
              }
            >
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
                    {
                      announcements[0]
                        .priority
                    }
                  </span>

                  <h3>
                    {
                      announcements[0]
                        .title
                    }
                  </h3>

                  <p>
                    {
                      announcements[0]
                        .content
                    }
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
                  href="/announcements"
                  action="Create Announcement"
                />
              )}
            </div>
          </section>

          <section
            className={
              styles.quickPanel
            }
          >
            <div
              className={
                styles.quickHeading
              }
            >
              <div>
                <span>
                  OPERATIONS
                </span>

                <h2>
                  Quick Actions
                </h2>
              </div>

              <Link href="/ai-assistant">
                Ask ClubOps AI →
              </Link>
            </div>

            <div
              className={
                styles.quickGrid
              }
            >
              <QuickAction
                href="/events"
                icon="◈"
                title="Create Event"
                text="Plan your next club activity."
              />

              <QuickAction
                href="/tasks"
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
    <article
      className={
        styles.stat
      }
    >
      <div
        className={
          styles.statTop
        }
      >
        <span
          className={
            styles.statIcon
          }
        >
          {icon}
        </span>

        <span
          className={
            styles.statLabel
          }
        >
          {label}
        </span>
      </div>

      <strong>
        {value}
      </strong>

      <p>
        {note}
      </p>
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
      className={
        styles.panelHeader
      }
    >
      <div>
        <span>
          {eyebrow}
        </span>

        <h2>
          {title}
        </h2>
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
        {icon}
      </div>

      <strong>
        {title}
      </strong>

      <p>
        {text}
      </p>

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
      <span>
        {icon}
      </span>

      <div>
        <strong>
          {title}
        </strong>

        <p>
          {text}
        </p>
      </div>

      <b>→</b>
    </Link>
  );
}