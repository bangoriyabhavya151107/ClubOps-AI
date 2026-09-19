"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

export default function Sidebar({ role }) {
  const pathname = usePathname();
  const router = useRouter();

  const menus = {
    admin: [
      { name: "Dashboard", href: "/dashboard", icon: "📊" },
      { name: "Members", href: "/dashboard/members", icon: "👥" },
      { name: "Events", href: "/dashboard/events", icon: "📅" },
      { name: "Tasks", href: "/dashboard/tasks", icon: "✅" },
      { name: "Meetings", href: "/dashboard/meetings", icon: "🗓️" },
      { name: "Documents", href: "/dashboard/documents", icon: "📁" },
      { name: "Announcements", href: "/dashboard/announcements", icon: "📢" },
      { name: "Budget", href: "/dashboard/budget", icon: "💰" },
      { name: "Risks", href: "/dashboard/risks", icon: "⚠️" },
      { name: "Reports", href: "/dashboard/reports", icon: "📈" },
      { name: "AI Assistant", href: "/dashboard/ai", icon: "🤖" },
      { name: "Settings", href: "/dashboard/settings", icon: "⚙️" },
    ],

    coordinator: [
      { name: "Dashboard", href: "/dashboard", icon: "📊" },
      { name: "Members", href: "/dashboard/members", icon: "👥" },
      { name: "Events", href: "/dashboard/events", icon: "📅" },
      { name: "Tasks", href: "/dashboard/tasks", icon: "✅" },
      { name: "Meetings", href: "/dashboard/meetings", icon: "🗓️" },
      { name: "Documents", href: "/dashboard/documents", icon: "📁" },
      { name: "Announcements", href: "/dashboard/announcements", icon: "📢" },
      { name: "Budget", href: "/dashboard/budget", icon: "💰" },
      { name: "Reports", href: "/dashboard/reports", icon: "📈" },
      { name: "AI Assistant", href: "/dashboard/ai", icon: "🤖" },
    ],

    volunteer: [
      { name: "Dashboard", href: "/dashboard", icon: "📊" },
      { name: "Events", href: "/dashboard/events", icon: "📅" },
      { name: "My Tasks", href: "/dashboard/tasks", icon: "✅" },
      { name: "Meetings", href: "/dashboard/meetings", icon: "🗓️" },
      { name: "Documents", href: "/dashboard/documents", icon: "📁" },
      { name: "Announcements", href: "/dashboard/announcements", icon: "📢" },
      { name: "AI Assistant", href: "/dashboard/ai", icon: "🤖" },
    ],

    member: [
      { name: "Dashboard", href: "/dashboard", icon: "📊" },
      { name: "Events", href: "/dashboard/events", icon: "📅" },
      { name: "My Tasks", href: "/dashboard/tasks", icon: "✅" },
      { name: "Meetings", href: "/dashboard/meetings", icon: "🗓️" },
      { name: "Documents", href: "/dashboard/documents", icon: "📁" },
      { name: "Announcements", href: "/dashboard/announcements", icon: "📢" },
      { name: "AI Assistant", href: "/dashboard/ai", icon: "🤖" },
    ],
  };

  const currentMenus = menus[role] || menus.member;

  async function logout() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  return (
    <aside className="dashboard-sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon">C</div>

        <div>
          <h2>ClubOps AI</h2>
          <span>Club Management</span>
        </div>
      </div>

      <div className="role-box">
        <span className="role-label">YOUR ROLE</span>
        <strong>
          {role ? role.charAt(0).toUpperCase() + role.slice(1) : "Member"}
        </strong>
      </div>

      <nav className="sidebar-nav">
        {currentMenus.map((item) => {
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`sidebar-link ${active ? "active" : ""}`}
            >
              <span>{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <button className="logout-button" onClick={logout}>
        🚪 Logout
      </button>
    </aside>
  );
}