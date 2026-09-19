"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import StatCard from "./StatCard";

export default function DashboardContent({ user, role }) {
  const [stats, setStats] = useState({
    members: 0,
    events: 0,
    tasks: 0,
    meetings: 0,
    announcements: 0,
  });

  const [club, setClub] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, [user]);

  async function loadDashboard() {
    if (!user) return;

    try {
      setLoading(true);

      const { data: membership } = await supabase
        .from("club_members")
        .select("club_id, role")
        .eq("user_id", user.id)
        .eq("status", "active")
        .order("joined_at", { ascending: true })
        .limit(1)
        .maybeSingle();

      if (!membership?.club_id) {
        setLoading(false);
        return;
      }

      const clubId = membership.club_id;

      const { data: clubData } = await supabase
        .from("clubs")
        .select("*")
        .eq("id", clubId)
        .maybeSingle();

      setClub(clubData);

      const [
        membersResult,
        eventsResult,
        tasksResult,
        meetingsResult,
        announcementsResult,
      ] = await Promise.all([
        supabase
          .from("club_members")
          .select("*", { count: "exact", head: true })
          .eq("club_id", clubId)
          .eq("status", "active"),

        supabase
          .from("events")
          .select("*", { count: "exact", head: true })
          .eq("club_id", clubId),

        supabase
          .from("tasks")
          .select("*", { count: "exact", head: true })
          .eq("club_id", clubId),

        supabase
          .from("meetings")
          .select("*", { count: "exact", head: true })
          .eq("club_id", clubId),

        supabase
          .from("announcements")
          .select("*", { count: "exact", head: true })
          .eq("club_id", clubId),
      ]);

      setStats({
        members: membersResult.count || 0,
        events: eventsResult.count || 0,
        tasks: tasksResult.count || 0,
        meetings: meetingsResult.count || 0,
        announcements: announcementsResult.count || 0,
      });
    } catch (error) {
      console.error("Dashboard error:", error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-content">
      <div className="welcome-section">
        <div>
          <span className="welcome-label">WELCOME BACK 👋</span>

          <h2>
            {user?.user_metadata?.full_name ||
              user?.email?.split("@")[0] ||
              "User"}
          </h2>

          <p>
            Here is what is happening with your club today.
          </p>
        </div>

        <div className="club-info">
          <span>🏫</span>
          <div>
            <strong>
              {club?.name || "My College Club"}
            </strong>
            <small>
              {club?.college_name || "College"}
            </small>
          </div>
        </div>
      </div>

      <div className="stats-grid">
        <StatCard
          title="Total Members"
          value={stats.members}
          icon="👥"
          description="Active club members"
        />

        <StatCard
          title="Total Events"
          value={stats.events}
          icon="📅"
          description="Club events"
        />

        <StatCard
          title="Total Tasks"
          value={stats.tasks}
          icon="✅"
          description="Club tasks"
        />

        <StatCard
          title="Meetings"
          value={stats.meetings}
          icon="🗓️"
          description="Club meetings"
        />
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-panel">
          <div className="panel-header">
            <div>
              <h3>Quick Actions</h3>
              <p>Common things you can do</p>
            </div>
          </div>

          <div className="quick-actions">
            {(role === "admin" || role === "coordinator") && (
              <>
                <a href="/dashboard/events" className="quick-action">
                  <span>📅</span>
                  <strong>Create Event</strong>
                  <small>Plan a new club event</small>
                </a>

                <a href="/dashboard/tasks" className="quick-action">
                  <span>✅</span>
                  <strong>Create Task</strong>
                  <small>Assign work to members</small>
                </a>
              </>
            )}

            <a href="/dashboard/meetings" className="quick-action">
              <span>🗓️</span>
              <strong>Meetings</strong>
              <small>View club meetings</small>
            </a>

            <a
              href="/dashboard/announcements"
              className="quick-action"
            >
              <span>📢</span>
              <strong>Announcements</strong>
              <small>
                {stats.announcements} announcements
              </small>
            </a>
          </div>
        </div>

        <div className="dashboard-panel">
          <div className="panel-header">
            <div>
              <h3>Role & Permissions</h3>
              <p>Your access level</p>
            </div>
          </div>

          <div className="permission-box">
            <div className="permission-role">
              <span className="permission-icon">
                {role === "admin"
                  ? "👑"
                  : role === "coordinator"
                  ? "🧑‍💼"
                  : role === "volunteer"
                  ? "🙋"
                  : "👤"}
              </span>

              <div>
                <strong>
                  {role
                    ? role.charAt(0).toUpperCase() +
                      role.slice(1)
                    : "Member"}
                </strong>

                <p>
                  {role === "admin"
                    ? "Full club management access"
                    : role === "coordinator"
                    ? "Event and team coordination access"
                    : role === "volunteer"
                    ? "Task and event participation access"
                    : "Basic club member access"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-panel">
        <div className="panel-header">
          <div>
            <h3>ClubOps AI</h3>
            <p>AI-powered college club management</p>
          </div>

          <a href="/dashboard/ai" className="ai-button">
            🤖 Open AI Assistant
          </a>
        </div>

        <div className="ai-banner">
          <div className="ai-banner-icon">✨</div>

          <div>
            <h3>Work smarter with ClubOps AI</h3>
            <p>
              Get help with event planning, task management,
              announcements, reports and club operations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}