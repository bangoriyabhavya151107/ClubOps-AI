"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: "📊",
  },
  {
    name: "Members",
    href: "/members",
    icon: "👥",
  },
  {
    name: "Events",
    href: "/events",
    icon: "📅",
  },
  {
    name: "Attendance",
    href: "/attendance",
    icon: "✅",
  },
  {
    name: "Tasks",
    href: "/tasks",
    icon: "📋",
  },
  {
    name: "Meetings",
    href: "/meetings",
    icon: "🗓️",
  },
  {
    name: "Documents",
    href: "/documents",
    icon: "📄",
  },
  {
    name: "Announcements",
    href: "/announcements",
    icon: "📢",
  },
  {
    name: "Reports",
    href: "/reports",
    icon: "📈",
  },
  {
    name: "AI Assistant",
    href: "/ai-assistant",
    icon: "🤖",
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sidebar">

      <div className="sidebar-logo">
        <div className="logo-icon">C</div>

        <div>
          <h2>ClubOps</h2>
          <span>AI Management</span>
        </div>
      </div>

      <nav className="sidebar-menu">

        <p className="menu-title">MAIN MENU</p>

        {menuItems.map((item) => {
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`menu-item ${active ? "active" : ""}`}
            >
              <span className="menu-icon">
                {item.icon}
              </span>

              <span>{item.name}</span>
            </Link>
          );
        })}

      </nav>

      <div className="sidebar-bottom">

        <Link href="/settings" className="menu-item">
          <span className="menu-icon">⚙️</span>
          <span>Settings</span>
        </Link>

        <Link href="/profile" className="menu-item">
          <span className="menu-icon">👤</span>
          <span>Profile</span>
        </Link>

      </div>

    </aside>
  );
}